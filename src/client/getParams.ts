import qs from "query-string";

const getParams = () => {
  const args: any = qs.parse(location.search);
  return JSON.parse(args.params);
};

export default getParams;
