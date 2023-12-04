import Chart from "./Chart";

const ToolTipContent = (props: any) => {
  if (!props.active || !props.payload) return;
  const { payload } = props;
  const { value } = payload[0];
  return (
    <div className="rounded-md bg-white p-2 shadow-md">
      <div className="text-muted-foreground text-xs">Nuevos Usuarios</div>
      <div className="text-muted-foreground text-sm font-medium">
        {value}
      </div>
    </div>
  );
};

// Main component
export function NewCustomersChart ({ data }: Readonly<{
  data: {
    name: string;
    value: any;
  }[]
}>) {

  return (
    <Chart data={data} ToolTipContent={ToolTipContent} />
  );
}