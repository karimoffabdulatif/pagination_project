import { Button } from "@mui/material";
import { ServiceTable } from "../../components/ui";
import {Client} from "@modal"
import { useEffect, useState } from "react";
import { client } from "../../service"; // Clientni to'g'ri import qilish
import Pagination from '@mui/material/Pagination';

const Index = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0)
  const [params, setParams]= useState ({
    limit: 5,
    page: 2
  })

  const getData = async () => {
    try {
      const response = await client.get('/endpoint', { params }); // endpointni to'g'ri belgilang
      if (response.status === 200 && response?.data?.clients_all) {
        setData(response?.data?.clients);
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const handleChange = (event, value) => {
    setParams({
      ...params, 
      page: value
    })
  };

  return (
    <>
      <Client open={open} handleClose={() => setOpen(false)} />
      <div className="flex flex-col gap-3">
        <div className="flex justify-end">
          <Button
            variant="contained" // Bo'sh joyni olib tashladik
            color="primary"
            onClick={() => setOpen(true)}
          >
            Add
          </Button>
        </div>
        <ServiceTable data={data} />
        <Pagination 
          count={count} 
          page={params.page} 
          onChange={handleChange} 
          sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }} 
        />
      </div>
    </>
  );
};

export default Index;
