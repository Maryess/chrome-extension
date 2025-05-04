const chrome = {
    runtime: {
      getURL: (path: string) => `http://localhost:5173${path}`,
      id: 'mock-extension-id'
    },
    windows: {
      create: (options: any) => {
        window.open(options.url, '_blank', `width=${options.width},height=${options.height}`);
      }
    }
  };
  
  export default chrome;