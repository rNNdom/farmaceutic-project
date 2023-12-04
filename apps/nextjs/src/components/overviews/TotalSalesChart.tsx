import Chart from "./Chart";


const ToolTipContent = (props: any) => {
  if (!props.active || !props.payload) return;
  const { payload } = props;
  const { value } = payload[0];
  return (
    <div className="rounded-md bg-white p-2 shadow-md">
      <div className="text-muted-foreground text-xs">Ingreso Total</div>
      <div className="text-muted-foreground text-sm font-medium">
        CLP ${value}
      </div>
    </div>
  );
};

export function TotalSalesChart ({ data }: Readonly<{
  data: {
    name: string;
    value: any;
  }[]
}>) {


  return (
    <Chart data={data} ToolTipContent={ToolTipContent} />
  );

}
