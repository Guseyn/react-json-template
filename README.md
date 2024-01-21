# React JSON Template

This is my little gift to React Community. It's inspired by [EHTML](https://e-html.org). More specifically, by `<template is="e-json">`.

# How It Works

`ReactJSONTemplate` component fetches JSON object from some URL, which you specify in `src` attribute and allow you to map the response to some template you specify in `template` attribute. You can also specify `fallback` template.

```jsx
function App() {
  const country = new URLSearchParams(window.location.search).get('country')
  return (
    <>
      <ReactJSONTemplate
        src={`https://restcountries.com/v3.1/name/${country}`}
        headers={{}}
        fallback={() => {
          return <div>Loading...</div>
        }}
        template={(data, statusCode, /* headers */) => {
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
          return <>Internal Server Error</>
        }}></ReactJSONTemplate>
    </>
  );
}
```

In the example above, we are trying to fetch some country from URL and then we map the country to some template.

When you open you browser with URL: `http://127.0.0.1:5173/?country=cyprus`, you will get following:

<img width="500px" src="https://github.com/Guseyn/react-json-template/blob/main/cyprus.png?raw=true">

Or let's say when you open `http://127.0.0.1:5173/?country=poland`, you will see:

<img width="500px" src="https://github.com/Guseyn/react-json-template/blob/main/poland.png?raw=true">

If you open non-existing country like `http://127.0.0.1:5173/?country=non-existing`, you will see:

<img width="500px" src="https://github.com/Guseyn/react-json-template/blob/main/404.png?raw=true">

This is how `ReactJSONTemplate` [is implemented](lib/ReactJSONTemplate.tsx).

# How to Run Examples

After you clone this project, execute following commands:

```bash
npm i
npm run dev
```

Then open page: http://127.0.0.1:5173/.
