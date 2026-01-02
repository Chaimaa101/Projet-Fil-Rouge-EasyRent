import { useContext, useEffect } from "react";
import { PaymentContext } from "../../Context/PaymentProvider";
import PageHeader from "../Admin/common/PageHeader";
import GlobalLoader from "../../components/common/GlobalLoader";

export default function MesPayments() {
  const { payments, getPayments, viewInvoice, downloadInvoice } =
    useContext(PaymentContext);

  useEffect(() => {
    getPayments();
  }, []);

  return (
    <>
      <PageHeader
        title="Mes paiments"
        subtitle="Consulter et gérer mes paiments"
        num={payments.length}
      />
      {loading && <GlobalLoader />}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 m-12">
        {payments.map((payment) => (
          <div
            key={payment.id}
            className="bg-white rounded-xl shadow-md border border-teal-100 p-6"
          >
            <h2 className="font-semibold text-gray-800">
              Payment #{payment.id}
            </h2>

            <p className="text-sm text-gray-500">{payment.created_at}</p>

            <p className="text-xl font-semibold text-teal-700 mt-3">
              {payment.amount} DH
            </p>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => viewInvoice(payment.reservation_id)}
                className="bg-gray-200 px-4 py-2 rounded-lg"
              >
                View Invoice
              </button>

              <button
                onClick={() => downloadInvoice(payment.reservation_id)}
                className="bg-teal-600 text-white px-4 py-2 rounded-lg"
              >
                Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
