import {
  Card,
  Typography,
  IconButton,
  CardFooter
} from "@material-tailwind/react";
import { TrashIcon } from "@heroicons/react/24/solid";

const TABLE_HEAD = ["Titulo", "Precio", "Cantidad", ""];

const TABLE_ROWS = [
  {
    titulo: "El Principito",
    precio: "6990",
    cantidad: "1",
  },

];

export default function Example() {
  return (
    <Card className="overflow-scroll h-full w-full">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TABLE_ROWS.map(({ titulo, precio, cantidad }, index) => {
            const isLast = index === TABLE_ROWS.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

            return (
              <tr>
                <td className={classes}>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {titulo}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {precio}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {cantidad}
                  </Typography>
                </td>
                <td className={classes}>
                  <IconButton variant="text" color="blue-gray">
                    <TrashIcon className="h-5 w-5" />
                  </IconButton>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography color="blue-gray" variant="small">
          Total
        </Typography>
        <Typography color="blue-gray" variant="small">
          $6990
        </Typography>

      </CardFooter>
    </Card>
  );
}