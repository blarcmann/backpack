import { Component } from 'react';
import Head from 'next/head';
import axios from 'axios';

export default class Home extends Component {


  constructor(props) {
    super(props);
    this.state = {
      link: '',
      banner: './images/banner-placeholder.png',
      descriptionMeta: '',
      imageMeta: '',
      titleMeta: '',
      displayCard: false,
      corsURL: 'https://cors-anywhere.herokuapp.com/',
    }
  }

  trimText = (str) => {
    if (typeof str !== 'string' && str.length > 150) {
      return;
    }
    let substr = str.substring(0, 150)
    return `${substr}...`
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { corsURL, link } = this.state;
    const url = `${corsURL}${link}`;
    axios.get(url)
      .then(response => {
        let data = response.data;
        const dataSplit = data.split('<meta');
        if (dataSplit.length > 0) {
          this.setState({ displayCard: true })
        }
        dataSplit.forEach((meta) => {
          this.findMetaContent(meta, 'description');
          this.findMetaContent(meta, 'image');
          this.findMetaContent(meta, 'title');
        })
      })
      .catch(error => {
        console.log(error);
      })
  }

  findMetaContent = (meta, metaName) => {
    if (metaName === 'description') {
      if (meta.includes('property="og:description"') || meta.includes('name="twitter:description') ||
        meta.includes('name="description"')) {
        let splitMeta = meta.split('content="')[1];
        const toStr = splitMeta.replace(/[^a-zA-Z ]/g, "")
        const splToStr = toStr.split(' ');
        splToStr.pop();
        const descriptionMeta = splToStr.join(' ');
        this.setState({ descriptionMeta: this.trimText(descriptionMeta) || 'Description not found :( ' });
      }
    }
    if (metaName === 'image') {
      if (meta.includes('property="og:image"') || meta.includes('name="twitter:image') ||
        meta.includes('name="image"')) {
        let splitMeta = meta.split('content="')[1];
        const imageMeta = splitMeta.split('"')[0];
        this.setState({ imageMeta: imageMeta || '' })
        console.log(imageMeta);
      }
    }
    if (metaName === 'title') {
      if (meta.includes('property="og:title"') || meta.includes('name="twitter:title') ||
        meta.includes('name="title"')) {
        console.log(meta);
        let splitMeta = meta.split('="')[1];
        const toStr = splitMeta.replace(/[^a-zA-Z ]/g, "");
        const splToStr = toStr.split(' ');
        splToStr.pop();
        const titleMeta = splToStr.join(' ');
        this.setState({ titleMeta: titleMeta });
        console.log(titleMeta);
      }
    }
  }

  getMetaContent = (data, name) => {
    let orrygun = data.filter(tag => console.log(tag));
    console.log(orrygun);
    // return data.filter((index, tag) => tag && tag.name && tag.name == name);
    // .attr('content');
  }

  handleChange = (value) => {
    this.setState({ link: value })
  }


  render() {
    const { banner, url, link, descriptionMeta, imageMeta, titleMeta, displayCard } = this.state;
    return (
      <div className="container">
        <Head>
          <title>Add Item to backpack</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <div className="grid-content">
            <p className="description"> Enter <code>website URL</code> to continue</p>
            <div className="url-form">
              <form className="url-form" onSubmit={this.handleSubmit}>
                <input type="url" className="" value={url} onChange={(e) => this.handleChange(e.target.value)} />
                <button onClick={this.handleSubmit}>
                  <img src="./images/continue.png" alt=">" />
                </button>
              </form>
            </div>
            {displayCard
              ? <div className="grid">
                <div className="url-card slide-in">
                  <span className="close">
                    <img src="./images/close.png" alt="x" />
                  </span>
                  <div className="url-banner">
                    {imageMeta
                      ? <img src={imageMeta} alt="url" />
                      : <img src={banner} alt="x" />}
                  </div>
                  <div className="url-details">

                    <h2 className="title">{titleMeta ? titleMeta : 'No title was found :( '}</h2>
                    <p className="description">{descriptionMeta ? descriptionMeta : 'No description was found'}</p>
                    <a href="" className="link">{link || ' link-not-found'}</a>
                  </div>
                </div>
              </div>
              : ''}
          </div>
        </main>

        <footer>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{' '}
            <img src="/vercel.svg" alt="Vercel Logo" className="logo" />
          </a>
        </footer>

        <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 100%;
        }
        
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        footer img {
          margin-left: 0.5rem;
        }
        
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        a {
          color: inherit;
          text-decoration: none;
        }
        
        .title a {
          color: #0070f3;
          text-decoration: none;
        }
        
        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }
        
        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }
        
        .title,
        .description {
          text-align: center;
        }
        
        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }
        
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
          DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }
        
        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          max-width: 700px;
          margin-top: 3rem;
        }
        
        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }
        
        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }
        
        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }
        
        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }
        
        .logo {
          height: 1em;
        }
        
        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
        `}</style>

        <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
          Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
          sans-serif;
        }
        
        * {
          box-sizing: border-box;
        }
        `}</style>
      </div >
    )
  }
}
