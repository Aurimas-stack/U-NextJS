import { useEffect, useState } from "react";
import useSWR from "swr";

const LastSalesPage = (props) => {
  const [saleData, setSaleData] = useState(props.sales);
  // const [loading, setLoading] = useState(false);
  //useSWR(<request-url>, (url) => fetch(url).then(res => res.json()))
  const reqUrl =
    "https://next-course-17728-default-rtdb.firebaseio.com/Sales.json";
  const { data, error } = useSWR(reqUrl, (url) =>
    fetch(url).then((res) => res.json())
  );

  useEffect(() => {
    if (data) {
      const loadedData = [];
      for (const key in data) {
        loadedData.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }
      setSaleData(loadedData);
    }
  }, []);

  /*useEffect(() => {
    setLoading(true);
    fetch("https://next-course-17728-default-rtdb.firebaseio.com/Sales.json")
      .then((response) => response.json())
      .then((data) => {
        const loadedData = [];
        for (const key in data) {
          loadedData.push({
            id: key,
            username: data[key].username,
            volume: data[key].volume,
          });
        }
        setData(loadedData);
        setLoading(false);
      });
  }, []);*/

  if (error) {
    return <p>Failed to load.</p>;
  }
  if (!data && !sales) {
    return <p>Loading...</p>;
  }

  return (
    <ul>
      {saleData.map((sale) => (
        <li key={sale.id}>
          {sale.username} - {sale.volume}
        </li>
      ))}
    </ul>
  );
};

export async function getStaticProps() {
  return fetch(
    "https://next-course-17728-default-rtdb.firebaseio.com/Sales.json"
  )
    .then((response) => response.json())
    .then((data) => {
      const loadedData = [];
      for (const key in data) {
        loadedData.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }

      return {
        props: { sales: loadedData },
        revalidate: 10,
      };
    });
}

export default LastSalesPage;
