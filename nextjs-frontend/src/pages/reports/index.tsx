import { NextPage } from "next";
import { Page } from "../../components/Page";
import { parseISO, format } from "date-fns";
import {
  Grid,
  PagingPanel,
  SearchPanel,
  Table,
  TableHeaderRow,
  Toolbar,
} from "@devexpress/dx-react-grid-material-ui";
import {
  Column,
  IntegratedFiltering,
  IntegratedPaging,
  PagingState,
  SearchState,
  SortingState,
} from "@devexpress/dx-react-grid";

import { Head } from "../../components/Head";
import { useRouter } from "next/router";
import { useAuthSwr } from "../../hooks/useAuthSwr";
import { Button, Link, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { withAuth } from "../../hof/withAuth";
import makeHttp from "../../utils/http";

const columns: Column[] = [
  {
    name: "start_date",
    title: "Inicio",
    getCellValue: (row: any, columnName: string) => {
      return format(parseISO(row[columnName].slice(0, 10)), "dd/MM/yyyy");
    },
  },
  {
    name: "end_date",
    title: "Fim",
    getCellValue: (row: any, columnName: string) => {
      return format(parseISO(row[columnName].slice(0, 10)), "dd/MM/yyyy");
    },
  },
  {
    name: "status",
    title: "Status",
  },
  {
    name: "file_url",
    title: "Download",
    getCellValue: (row: any, columnName: string) => {
      return row[columnName] ? (
        <Link href={row[columnName]} rel="noreferrer" target="_blank">
          Link
        </Link>
      ) : null;
    },
  },
  {
    name: "created_at",
    title: "Criado em",
    getCellValue: (row: any, columnName: string) => {
      return format(parseISO(row[columnName].slice(0, 10)), "dd/MM/yyyy");
    },
  },
];

const ReportsListPage: NextPage<{ reports: any }> = ({ reports }) => {
  const router = useRouter();
  const { data, error } = useAuthSwr("reports", {
    refreshInterval: 20000,
    fallbackData: reports,
  });

  return (
    <Page>
      <Head title="Meus relatórios" />
      <Typography component="h1" variant="h4" color="textPrimary" gutterBottom>
        Relatórios
      </Typography>
      <Button
        startIcon={<AddIcon />}
        variant={"contained"}
        color="primary"
        onClick={() => router.push("/reports/new")}
      >
        Criar
      </Button>
      <Grid rows={data} columns={columns}>
        <Table />
        <SortingState
          defaultSorting={[{ columnName: "created_at", direction: "desc" }]}
        />
        <SearchState defaultValue="" />
        <PagingState defaultCurrentPage={0} pageSize={5} />
        <TableHeaderRow showSortingControls />
        <IntegratedFiltering />
        <Toolbar />
        <SearchPanel />
        <PagingPanel />
        <IntegratedPaging />
      </Grid>
    </Page>
  );
};

export default ReportsListPage;

export const getServerSideProps = withAuth(async (ctx, { token }) => {
  const { data: reports } = await makeHttp(token).get("reports");

  return {
    props: {
      reports,
    },
  };
});
