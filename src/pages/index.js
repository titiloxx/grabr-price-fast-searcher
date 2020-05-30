import React,{useState,useEffect} from "react"
import { Link } from "gatsby"
import moment from "moment"
import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
// https://qigmjvf5v1.execute-api.us-east-1.amazonaws.com/Stage
import ReactTable from 'react-table'
import matchSorter from 'match-sorter'
import 'react-table/react-table.css'

const useFetch = (url, options) => {
  const [response, setResponse] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url, options);
        const json = await res.json();
        setResponse(json.map(x=>({title:x.attributes.title,price:Math.round(x.attributes.items_price.amount),hace:moment().diff(moment(x.attributes.created_at),"hours"),link:x.links.self})));
        setLoading(false)
      } catch (error) {
        console.log("ERROR FETCH")
        console.log(error)
        setLoading(error);
        setLoading(false)
      }
    };
    fetchData();
  }, []);
  return [ response, loading ];
};

const IndexPage = () =>{
    const [data,loading] =useFetch("https://qigmjvf5v1.execute-api.us-east-1.amazonaws.com/Stage");
    const columns = [{
    Header: 'Titulo',
    accessor: 'title',
    filterMethod: (filter, rows) =>
                  rows.filter(x=>x.title.toLowerCase().includes(filter.value.toLowerCase())),
    filterAll: true// String-based value accessors!
    }, 
    {
    Header: 'Precio',
    accessor: 'price',
    filterMethod: (filter, rows) =>
              rows.filter(x=>parseInt(x.price)>parseInt(filter.value)),
    filterAll: true// String-based value accessors!
      },
    {
    Header: 'Publicado hace (horas)',
    accessor: 'hace'
      }
    ,{
    Header: 'Link',
    accessor: 'link',
    Cell: props => <div style={{color:"blue",cursor:"pointer"}} onClick={()=>{window.open(props.value)}}>{props.value}</div>
      }]
      return (
        <Layout>
          <SEO title="Home" />
          <h1>Hi people</h1>
          <p>Welcome to your new Gatsby site.</p>
          <p>Now go build something great.</p>
          <ReactTable filterable loadingText={"Cargando..."} loading={loading} columns={columns} data={data} />
          <Link to="/page-2/">Go to page 2</Link>
        </Layout>
      )
   }
   
export default IndexPage
