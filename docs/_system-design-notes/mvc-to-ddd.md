# 电商系统架构演进：从 MVC 到分布式高并发

## 一、起点：MVC（Model–View–Controller，模型-视图-控制器）

最初的世界是简单的。

在经典的 MVC 架构里（如 Spring MVC），系统被分成三个角色：Model 负责数据与业务，View 负责展示，Controller 负责入口调度。三者分工明确，就像一个小而精干的团队——Controller 接收请求，Model 处理数据，View 呈现结果。

一个典型的代码可能是这样：

```java
@PostMapping("/order")
public Result createOrder(Long userId, Long productId) {
    // 1. 验证用户
    User user = userDao.findById(userId);
    if (user == null) {
        return Result.fail("用户不存在");
    }

    // 2. 检查并扣减库存
    Product product = productDao.findById(productId);
    if (product == null || product.getStock() < 1) {
        return Result.fail("库存不足");
    }
    product.setStock(product.getStock() - 1);
    productDao.save(product);

    // 3. 创建订单
    Order order = new Order();
    order.setUserId(userId);
    order.setProductId(productId);
    order.setStatus("CREATED");
    orderDao.save(order);

    return Result.ok(order);
}
```

在这个阶段，一切都还"看起来不错"。但问题悄悄埋下了伏笔。

---

## 二、第一次失控：Controller 变胖（Fat Controller）

随着业务增长，Controller 开始承担越来越多的责任——参数校验、业务判断、数据操作，全都挤进同一个方法里。它从"调度者"悄然蜕变成了"全能选手"。

这时人们意识到一个根本问题：

> **Controller 本该只处理 HTTP，却开始处理业务**

于是第一次优化出现了。

---

## 三、第一次进化：Thin Controller + Service Layer

人们引入了 Service 层（业务服务层），形成经典三层结构：

```text
Controller → Service → Model
```

Controller 变"薄"（Thin Controller），只负责调用：

```java
@PostMapping("/order")
public Result createOrder(Long userId, Long productId) {
    orderService.createOrder(userId, productId);
    return Result.ok();
}
```

业务逻辑被集中到 Service：

```java
void createOrder(Long userId, Long productId) {
    // 验证用户（省略）...

    Product p = productDao.find(productId);
    if (p.getStock() < 1) {
        throw new RuntimeException("库存不足");
    }
    p.setStock(p.getStock() - 1);
    productDao.update(p);

    Order order = new Order();
    order.setUserId(userId);
    order.setProductId(productId);
    order.setStatus("CREATED");
    orderDao.save(order);
}
```

> ⚠️ **注意**：此代码暂不考虑并发安全。在多线程场景下，`read-check-write` 三步并非原子操作，会出现超卖问题。生产环境需配合乐观锁（版本号）或悲观锁（`SELECT FOR UPDATE`）处理，或由后续引入的 Redis 原子操作接管。

> 📖 **延伸阅读**：乐观锁与悲观锁的原理、适用场景及性能权衡，参见 Martin Fowler《Patterns of Enterprise Application Architecture》中的 *Optimistic Offline Lock* 与 *Pessimistic Offline Lock* 两节；JPA 的 `@Version` 注解是乐观锁的典型实现入口。

这一阶段解决了**职责分离问题**，系统变得更清晰。但新的问题又出现了。

---

## 四、第二次失控：Service 爆炸（God Service）

随着业务复杂度提升，下单、支付、退款、优惠券、库存……所有逻辑都堆在 Service 中。于是 Service 变成了臭名昭著的：

> **"上帝类（God Object）"**

代码开始充斥着大量 if/else，业务规则散落各处，维护愈发困难。与此同时，Model（模型）却越来越"瘦"，只剩下 getter 和 setter，没有任何业务行为：

```java
class Order {
    Long id;
    Long userId;
    Long productId;
    String status;
    // 只有 getter 和 setter，没有业务行为
}
```

因为业务逻辑全都被 Service 一手包办了。这就是典型的：

> **贫血模型（Anemic Model，贫血模型）**

系统再次走到瓶颈。

---

## 五、第二次进化：DDD（Domain-Driven Design，领域驱动设计）

为了应对复杂业务，人们引入了 DDD（领域驱动设计）。它带来了一个根本性的转变：

> **不再围绕"数据"建模，而是围绕"业务行为"建模**

### 1️⃣ 业务逻辑回归对象（Domain）

原来散落在 Service 里的逻辑，例如支付时的状态校验：

```java
if (order.getStatus() != OrderStatus.CREATED) {
    throw new IllegalStateException("订单状态不允许支付：" + order.getStatus());
}
order.setStatus(OrderStatus.PAID);
orderDao.update(order);
```

现在回归到 Order 对象本身：

```java
enum OrderStatus {
    CREATED, PAID, CANCELLED
}

class Order {
    Long id;
    Long userId;
    Long productId;
    OrderStatus status;

    void pay() {
        if (this.status != OrderStatus.CREATED) {
            throw new IllegalStateException("订单状态不允许支付：" + this.status);
        }
        this.status = OrderStatus.PAID;
    }
}
```

用枚举替代裸字符串，是 DDD 领域建模的基本要求：状态本身就是业务语言，不应是可以随意赋值的字符串。

这意味着：

> **业务规则"长"在对象里面，而不是散落在外面**

### 2️⃣ 引入 Application Service（应用服务）

Service 不再书写业务规则，而是退化为纯粹的"流程编排"——调用 Domain 执行核心逻辑，通过 Repository 管理数据进出，并负责事务控制：

```java
@Transactional
public void payOrder(Long orderId) {
    // 1. 获取数据（调用 Repository）
    Order order = orderRepository.findById(orderId);
    
    // 2. 执行核心业务逻辑（调用 Domain）
    order.pay();
    
    // 3. 落库持久化（调用 Repository）
    orderRepository.save(order);
}
```

### 3️⃣ 引入 Aggregate（聚合）

DDD 进一步提出系统必须划分"一致性边界"。以订单为例，Order（订单）与 OrderItem（订单项）之间必须保持强一致，它们共同构成一个聚合（Aggregate）。而库存（Stock）和商品（Product）则各自独立，属于不同的聚合边界。

```text
Order（订单）
 └── OrderItem（订单项）
```

### 4️⃣ 补充：CQRS（命令查询职责分离）

DDD 引入的聚合边界清晰了写操作，但订单列表查询、搜索过滤这类读操作往往需要跨聚合联查，如果强行通过聚合走 Repository 查询，代码会变得笨拙。

CQRS（Command Query Responsibility Segregation）是 DDD 的天然伴生模式，核心思想是：

> **写操作（Command）走聚合模型，读操作（Query）走独立的查询模型**

```text
写操作：HTTP → ApplicationService → Domain Aggregate → Repository（写库）
读操作：HTTP → QueryService → 读库（可以是 ES、宽表、只读副本）
```

这样聚合不需要为查询性能妥协，读模型可以自由反范式化。

> 📖 **延伸阅读**：CQRS 的核心难点在于**写模型变更后如何同步到读模型**（同步？异步？Event Sourcing？），以及读模型的一致性保障。入门参见 Martin Fowler 的文章 *CQRS*；进阶参见 Greg Young 关于 Event Sourcing + CQRS 结合使用的演讲。

---

## 六、第三次挑战：跨聚合 → 跨服务

当 DDD 聚合边界落地为独立的微服务后，一个新问题随之浮现：

> **如何保证多个服务之间的数据一致？**

创建订单与扣减库存分属两个独立服务，无法再用一个数据库事务一次性完成。

> 📖 **延伸阅读**：微服务的拆分时机与拆分粒度本身是一个大话题。何时从单体迁移到微服务、按什么边界拆（DDD 的 Bounded Context 是主要依据）、拆分后带来哪些新的运维负担，参见 Sam Newman《Building Microservices》第 1–3 章。

---

## 七、第三次进化：MQ + 最终一致性

系统引入 MQ（Message Queue，消息队列），如 Apache Kafka。核心思想是：

> **用"事件"代替"强事务"**

流程演变为：本地创建订单 → 发布 `OrderCreated` 事件 → 库存服务异步消费该事件完成扣库存。

但这里有一个关键陷阱——**在同一个事务里既写库又发 MQ 是错误的**：

```java
// ❌ 错误示范：事务提交和消息发送不是原子操作
@Transactional
public void createOrder(Long userId, Long productId) {
    orderRepository.save(order);
    eventBus.publish("OrderCreatedEvent", ...); // 若此处失败，订单已写库但事件丢失
}
```

解决方案是 **Outbox Pattern（本地消息表）**：在同一个数据库事务内，将事件写入 `outbox` 表而非直接发送。由独立的 Relay 进程（或 CDC，如 Debezium）轮询该表，将事件投递到 MQ。

```java
// ✅ 正确做法：事件写入 outbox 表，与业务数据同一事务
@Transactional
public void createOrder(Long userId, Long productId) {
    Order order = Order.create(userId, productId);
    orderRepository.save(order);

    // 写入本地消息表，和 order 在同一个事务里
    outboxRepository.save(new OutboxEvent("OrderCreatedEvent", order.getId(), productId));
    // ↑ 事务提交后，Relay 进程负责将 outbox 中的事件投递到 MQ
}
```

```java
// 库存系统：消费事件，必须保证幂等性
@KafkaListener(topics = "OrderCreatedEvent", groupId = "inventory-service")
public void onOrderCreated(Long orderId, Long productId) {
    // 幂等检查：同一个 orderId 只处理一次
    if (processedEventRepository.exists(orderId)) {
        return;
    }

    Product product = productRepository.findById(productId);
    product.deductStock();
    productRepository.save(product);

    processedEventRepository.markProcessed(orderId);
}
```

这套机制的三个保障要素：

| 要素 | 作用 |
|------|------|
| Outbox Pattern | 保证事件"至少投递一次"，不丢消息 |
| 幂等性（Idempotency） | 保证重复消费不产生副作用 |
| 重试机制 | 保证消费失败后可以恢复 |

> 📖 **延伸阅读**：
> - **Outbox Pattern**：Relay 进程的实现方式（轮询 vs CDC）、投递失败的死信处理，参见 microservices.io 上的 *Transactional Outbox* 词条；CDC 工具推荐 Debezium。
> - **幂等性**：上述代码的幂等检查（check → process → mark）本身在并发下仍有竞态，生产实现通常依赖数据库唯一索引或乐观锁兜底。深入参见 *Designing Data-Intensive Applications*（《数据密集型应用系统设计》）第 11 章。

系统由此从"强一致"转向：

> **最终一致性（Eventual Consistency，最终一致性）**

---

## 八、第四次挑战：高并发（秒杀场景）

当流量暴涨时，比如秒杀活动，数据库在高并发写入下迅速成为瓶颈，并发冲突愈演愈烈。

---

## 九、第四次进化：Redis + MQ + 数据库

系统引入 Redis，架构变为：

```text
请求 → Redis → MQ → 数据库
```

核心逻辑用 Redis 在内存中完成库存扣减。直接使用 `DECR` 不够，因为它没有边界检查——库存为 0 时继续 DECR 会变成负数，仍然超卖。正确做法是用 **Lua 脚本**保证"检查 + 扣减"的原子性：

```lua
-- deduct_stock.lua：原子检查并扣减，返回 1 表示成功，0 表示库存不足
local stock = tonumber(redis.call('GET', KEYS[1]))
if stock == nil or stock <= 0 then
    return 0
end
redis.call('DECR', KEYS[1])
return 1
```

```java
// Java 侧调用
Long result = redisTemplate.execute(deductStockScript, List.of("stock:1001"));
if (result == 0) {
    throw new RuntimeException("库存不足");
}
```

数据库则作为最终兜底，保障数据正确性：

```sql
UPDATE stock SET count = count - 1 WHERE count > 0;
```

这套架构的本质是职责分离：

> **Redis 扛流量，数据库保正确，MQ 做削峰**

> 📖 **延伸阅读**：Redis 库存预热（冷启动时如何将库存同步到 Redis）、Redis 宕机后的兜底策略、Redis 与数据库库存数据的最终对账机制，是秒杀系统真正复杂的部分。参见《Redis 设计与实现》及各大厂秒杀技术博客（阿里、京东均有公开分享）。

---

## 十、第五次挑战：恶意攻击（刷单）

系统在性能层面趋于稳定后，又面对了新的敌人——脚本刷接口、代理 IP 和多账号批量注册。攻击者不再与系统正面硬拼，而是伪装成合法请求渗透进来。

---

## 十一、第五次进化：风控系统（Anti-Fraud）

系统引入多层防护。在接入层，基于 Nginx 实施限流，将单用户每秒请求次数控制在合理阈值内。在协议层，要求请求携带 token、timestamp 和签名三要素，防止接口被裸调。在应用层，通过分析用户的点击频率和请求节奏来识别机器行为。在设备层，借助设备指纹（Device Fingerprint）锁定真实用户终端，使多账号攻击的成本大幅提升。

这套体系的核心思想并非"完全阻止攻击"，而是：

> **提高攻击成本，而不是完全阻止攻击**

> 📖 **延伸阅读**：签名机制的具体实现（HMAC-SHA256 签名、timestamp 防重放）、设备指纹的采集与对抗（浏览器 Canvas 指纹、WebGL 指纹）、行为风控的规则引擎与机器学习方案，参见 OWASP *Anti-Automation Cheat Sheet* 及各厂风控团队的技术分享。

---

## 十二、最终全景图

> 本文是一篇**架构演进概览**，每个节点只介绍核心动机和基本形态，不做深度展开。每节末尾的"延伸阅读"指向该话题的权威资料，建议按需深入。

我们把整个演进串起来：

```text
MVC
 ↓
Thin Controller + Service（职责分离）
 ↓
DDD + CQRS（围绕业务建模，读写分离）
 ↓
微服务拆分（服务边界物理隔离）
 ↓
MQ + Outbox Pattern（跨服务最终一致性）
 ↓
Redis + Lua 脚本（高并发原子扣减）
 ↓
风控系统（对抗恶意攻击）
```

---

## 十三、收束：一条主线

如果用一句话把整个演进讲完：

> **系统从"分层"开始，走向"解耦"，再走向"高并发"，最终走向"对抗复杂世界"。**

---

## 十四、终极理解

这条演进路径上的每一站，都在回答一个具体的工程问题。MVC 解决的是怎么写代码，Service 层解决的是怎么分层，DDD 解决的是怎么为业务建模，CQRS 解决的是读写负载特征不同怎么办，微服务解决的是团队和系统边界怎么对齐，MQ + Outbox 解决的是跨服务数据如何可靠流转，Redis + Lua 解决的是怎么在流量洪峰下做原子扣减，风控则解决的是怎么面对真实用户——以及那些伪装成用户的攻击者。

当你把这些串起来，你已经不再是在"学框架"，而是在理解：

> **一个系统，是如何一步步长大的。**
