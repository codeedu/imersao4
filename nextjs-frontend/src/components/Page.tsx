import { Container, makeStyles } from "@material-ui/core";
import { NextPage } from "next";
import Navbar from "./Navbar";

const useStyles = makeStyles({
  container: {
    height: "calc(100% - 64px)",
  },
});

interface PageProps {}
export const Page: NextPage<PageProps> = (props) => {
  const classes = useStyles();

  return (
    <>
      <Navbar />
      <Container className={classes.container}>{props.children}</Container>
    </>
  );
};
