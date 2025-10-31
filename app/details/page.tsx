import { serverOrdersApi } from "@/api/list/ordersApi";
import Layout from "@/components/ui/layout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatComma } from "@/lib/utils";

export default async function Details() {
  const ordersData = await serverOrdersApi.getOrders();

  if (!ordersData) return null;
  return (
    <Layout title="환전 내역" description="환전 내역을 확인하실 수 있어요.">
      <Table className="border rounded-2xl text-gray-700">
        <TableHeader>
          <TableRow>
            <TableHead className="text-field-label">거래 ID</TableHead>
            <TableHead className="text-field-label">거래 일시</TableHead>
            <TableHead className="text-field-label">매수 금액</TableHead>
            <TableHead className="text-field-label">체결 환율</TableHead>
            <TableHead className="text-field-label">매도 금액</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ordersData.data.map((orders) => (
            <TableRow key={orders.orderId} className="border-b-0">
              <TableCell>{orders.orderId}</TableCell>
              <TableCell>{orders.orderedAt}</TableCell>
              <TableCell className="text-right">
                {formatComma(orders.fromAmount, 0, 2)}
              </TableCell>
              <TableCell className="text-right">
                {formatComma(orders.appliedRate, 0, 2)}
              </TableCell>
              <TableCell className="text-right">
                {formatComma(orders.toAmount)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Layout>
  );
}
