import { useEffect, useState } from "react";
import { getStatistic } from "../../components/Statistic/statisticService";

type Order = {
  id: number;
  createdAt: string;
  status: "PAID" | "UNPAID";
  total: number; // số lượng
  price: number; // tiền
  payment_method: string;
  type: string;
};

type StatisticResponse = {
  orders: Order[];
  paidOrders: Omit<Order, "price">[]; 
  totalRevenue: number;
  totalProfit: number;
};

function Statistic() {
  const [data, setData] = useState<StatisticResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getStatistic();
        setData(res);
      } catch (err) {
        console.error("Fetch statistic error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="p-6 text-gray-500">Đang tải dữ liệu...</div>;
  }

  if (!data) {
    return <div className="p-6 text-red-500">Không có dữ liệu</div>;
  }

  const { orders, totalRevenue, totalProfit } = data;

  const paidOrders = orders.filter(o => o.status === "PAID");

  const totalOrders = orders.length;
  const totalPaidOrders = paidOrders.length;

  // hôm nay
  const today = new Date().toISOString().slice(0, 10);
  const todayRevenue = paidOrders
    .filter(o => o.createdAt.startsWith(today))
    .reduce((sum, o) => sum + o.price, 0);

  // doanh thu theo ngày
  const revenueByDate = paidOrders.reduce<Record<string, number>>(
    (acc, o) => {
      const date = o.createdAt.slice(0, 10);
      acc[date] = (acc[date] || 0) + o.price;
      return acc;
    },
    {}
  );

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Thống kê doanh thu</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Tổng doanh thu" value={`${totalRevenue.toLocaleString()} ₫`} />
        <StatCard title="Doanh thu đã thanh toán" value={`${totalProfit.toLocaleString()} ₫`} />
        <StatCard title="Tổng đơn hàng" value={totalOrders} />
        <StatCard title="Đơn đã thanh toán" value={totalPaidOrders} />
      </div>

      <div className="bg-white p-4 rounded shadow">
        <p className="text-sm text-gray-500">Doanh thu hôm nay</p>
        <p className="text-2xl font-semibold mt-2">
          {todayRevenue.toLocaleString()} ₫
        </p>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-medium mb-3">Doanh thu theo ngày</h2>
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Ngày</th>
              <th className="p-2 border text-right">Doanh thu</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(revenueByDate).map(([date, value]) => (
              <tr key={date}>
                <td className="p-2 border">{date}</td>
                <td className="p-2 border text-right">
                  {value.toLocaleString()} ₫
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-medium mb-3">Đơn đã thanh toán</h2>
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Ngày</th>
              <th className="p-2 border text-right">Tiền</th>
            </tr>
          </thead>
          <tbody>
            {paidOrders.map(o => (
              <tr key={o.id}>
                <td className="p-2 border">#{o.id}</td>
                <td className="p-2 border">{o.createdAt.slice(0, 10)}</td>
                <td className="p-2 border text-right">
                  {o.price.toLocaleString()} ₫
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-xl font-semibold mt-2">{value}</p>
    </div>
  );
}

export default Statistic;
