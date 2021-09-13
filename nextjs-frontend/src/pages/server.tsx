import { GetServerSideProps } from "next";

const ServerPage = (props: any) => {
  return <div>Server {props.name}</div>;
};

export default ServerPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {
      name: "Luiz Carlos",
    },
  };
};
