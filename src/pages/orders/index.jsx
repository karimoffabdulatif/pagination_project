import { Button } from "@mui/material";
import { Order } from "@modal";
import { OrderTable } from "../../components/ui";
import { useEffect, useState } from "react";
import { order } from "@service";
import Pagination from '@mui/material/Pagination';

const Index = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0)
  const [params, setParams] = useState({
    limit:5,
    page:1
  })

  const getData = async () => {
    try {
      const response = await order.get(params);
      console.log(response);
      if (response.status === 200 && response?.data?.orders_list) {
        setData(response?.data?.orders_list);
        setCount(response?.data?.total)
        let total = Math.ceil(response.data.total / params.limit)
        setCount(total)
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, [params]);

  const handleChange = (event, value) => {
    setParams({
      ...params, 
      page: value
    })
  };
  return (
    <>
      <Order open={open} handleClose={() => setOpen(false)} />
      <div className=" flex flex-col gap-3">
        <div className=" flex justify-end">
          <Button variant="contained" onClick={() => setOpen(true)}>
            Add Orders
          </Button>
        </div>
        <OrderTable data={data} />
        <Pagination count={count} page={params.page} onChange={handleChange}   sx={{marginLeft: '530px', marginTop: '20px'}}/>

      </div>
    </>
  );
};

export default Index;
