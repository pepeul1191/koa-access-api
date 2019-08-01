const data = {
  sistema_id: 1,
  base_url: 'http://localhost:3000/',
  static_url: 'http://localhost:3000/',
  static: 'dev',
  csrf: {
    secret: 'mpt/sr6eS2AlCRHU7DVThMgFTN08pnfSDf/C94eZx7udfm0lvgaYWLYJttYPKzGKDTlXwVU/d2FOxbKkgNlsTw==',
    key: 'csrf_val'
  },
};

const middlewares = {
  csrf : true,
  session : false,
  session_admin : true,
  logs : true,
  csrf_check: true, 
};

exports.data = data;
exports.middlewares = middlewares;
