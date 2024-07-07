import { Button } from "@mui/material";
import { Service } from "@modal";
import { ServiceTable } from "../../components/ui";
import { useEffect, useState } from "react";
import service from "../../service/service";
import Pagination from '@mui/material/Pagination';


const Index = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0)
  const [params, setParams]= useState ({
    limit: 5,
    page:2
  })

  const getData = async () => {
    try {
      const response = await service.get(params);
      if (response.status === 200 && response?.data?.services) {
        setData(response?.data?.services);
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
      <Service open={open} handleClose={() => setOpen(false)} />
      <div className=" flex flex-col gap-3">
        <div className=" flex justify-end">
          <Button
            variant=" contained"
            color="primary"
            onClick={() => setOpen(true)}
          >
            Add
          </Button>
        </div>
        <ServiceTable data={data} />
        <Pagination count={count} page={params.page} onChange={handleChange}   sx={{marginLeft: '530px', marginTop: '20px'}}/>
      </div>
    </>
  );
};

export default Index;
