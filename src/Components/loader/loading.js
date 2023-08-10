const Loader = () => {
    return (
      <div className="visible-loader" style={{}}>
        <div className="loaderHeight">
          <div
            className="rotate360"
            style={{
              background:
                'url(https://cdn.eckovation.com/academy/Imarticus_Loader_Circle-02.svg) 49.72% no-repeat',
              position: 'absolute',
              width: '120px',
              left: 'calc( 50% - 40px)',
              top: '8px',
              height: '150px',
            }}
          />
          <div
            className
            style={{
              height: '100px',
              width: '100px',
              position: 'absolute',
              margin: 'auto',
              background:
                'url(https://cdn.pegasus.imarticus.org/imarticus_2/imarticus_logo_loader.svg) center no-repeat',
              backgroundSize: '40%',
              left: 'calc(50% - 30px)',
              top: '30px',
            }}
          ></div>
        </div>
      </div>
    )
  }
  export default Loader
  