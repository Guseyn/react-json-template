import "./App.css";
import { ReactJSONTemplate } from "../lib/ReactJSONTemplate";

function App() {
  const country = new URLSearchParams(window.location.search).get('country')
  return (
    <div>
      <ReactJSONTemplate
        src={`https://restcountries.com/v3.1/name/${country}`}
        headers={{}}
        fallback={() => {
          return <div>Loading...</div>
        }}
        template={(data, statusCode) => {
          if (data && statusCode === 200) {
            return <>
              <h3>Information about <span>{data[0].name.official}</span></h3>
              <p>
                <span>Capital is </span><b>{data[0].capital[0]}</b><br/>
                <span>Localted in </span><b>{data[0].continents[0]}</b><br/>
                <span>Localted more specifically in </span><b>{data[0].subregion}</b><br/>
                <span>Flag looks like </span><img width="50px" src={data[0].flags.svg}/><br/>
                <span>Timezones are </span><b>{data[0].timezones.join(', ')}</b><br/>
                <span>Population is </span><b>{data[0].population}</b><br/>
                <span>Languages are </span><b>{Object.values(data[0].languages).join(', ')}</b><br/>
                <span>Currencies are </span><b>{Object.values(data[0].currencies).map((currency: any) => currency.name).join(', ')}</b><br/>
              </p>
            </>
        }
        if (statusCode === 404) {
          return <h1>Not Found</h1>
        }
        return <></>
      }}></ReactJSONTemplate>
    </div>
  );
}

export default App;
