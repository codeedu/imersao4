import { NextPage } from "next";
import {default as NextHead} from 'next/head'

interface HeadTitleProps {
  title: string;
}
export const Head: NextPage<HeadTitleProps> = (props) => {
  return (
    <NextHead>
      <title>{props.title} - FinCycle</title>
      {props.children}
    </NextHead>
  );
};
