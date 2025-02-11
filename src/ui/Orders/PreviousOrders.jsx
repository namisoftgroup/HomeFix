import OrderCard from "../cards/OrderCard";

const CurrentOrders = () => {
  const orders = [
    {
      id: 1,
      service: "الكهرباء",
      time: "03:23 م",
      date: "11/11/2025",
      location: "عمان شارع جامعة الدول",
      icon: "/images/service3.svg",
      isPrevious: false, 
    },
    {
      id: 2,
      service: "الصيانة",
      time: "03:23 م",
      date: "07/10/2025",
      location: "عمان شارع جامعة الدول",
      icon: "/images/service1.svg",
      isPrevious: true, 
    },
  ];

  return (
    <div className="orders-container">
      <div className="orders-list">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} isPrevious={order.isPrevious} />
        ))}
      </div>
    </div>
  );
};

export default CurrentOrders;
