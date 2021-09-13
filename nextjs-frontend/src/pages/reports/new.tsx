import { useKeycloak } from "@react-keycloak/ssr";
import { GetStaticProps, NextPage } from "next";
import { Page } from "../../components/Page";
import makeHttp from "../../utils/http";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import axios from "axios";
import { Head } from "../../components/Head";

const ReportsNewPage: NextPage = () => {
  const { initialized, keycloak } = useKeycloak();
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      await makeHttp().post("reports", data);
      router.push(`/reports`);
    } catch (e) {
      console.error(e);
    }
  };

  if (
    typeof window !== "undefined" &&
    initialized &&
    !keycloak?.authenticated
  ) {
    router.replace(`/login?from=${window!.location.pathname}`);
    return null;
  }

  return keycloak?.authenticated ? (
    <Page>
      <Head title="Novo relatório" />
      <Typography component="h1" variant="h4" color="textPrimary" gutterBottom>
        Novo relatório
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Grid container>
              <Grid item xs={12}>
                <TextField
                  {...register("start_date")}
                  type="date"
                  required
                  label="Início"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("end_date")}
                  type="date"
                  required
                  label="Fim"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Box marginTop={1}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Salvar
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Page>
  ) : null;
};

export default ReportsNewPage;