import { useGraphData } from "@/src/hooks/useGraphData";
import { Box, CircularProgress, Grid, Paper, Typography } from "@mui/material";
import dayjs from "dayjs";
import type { FunctionComponent } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
interface DashboardPageProps {}

const DashboardPage: FunctionComponent<DashboardPageProps> = () => {
  const { data, isLoading, error } = useGraphData();
  const currentYear = dayjs().year();

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography color="error">Error loading data</Typography>;
  if (!data || data.length === 0)
    return <Typography>No data available for {currentYear}</Typography>;

  // Calculate averages for reference lines
  const avgGluten =
    data.reduce(
      (sum: any, item: { glutenTotal: any }) => sum + item.glutenTotal,
      0,
    ) / data.length;
  const avgReceipt =
    data.reduce(
      (sum: any, item: { receiptTotal: any }) => sum + item.receiptTotal,
      0,
    ) / data.length;

  return (
    <Grid container spacing={3}>
      {/* Values Calculator */}
      <Grid size={12}>
        <Box sx={{ height: 300 }}>
          <Typography variant="h6" gutterBottom>
            {avgGluten.toFixed(2)}
          </Typography>
          <Typography variant="h6" gutterBottom>
            {avgReceipt.toFixed(2)}
          </Typography>
        </Box>
      </Grid>

      {/* Gluten Graph */}
      <Grid size={6}>
        <Paper sx={{ p: 2, height: "100%" }}>
          <Typography variant="h6" gutterBottom>
            Gluten Values - {currentYear}
          </Typography>
          <Box sx={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tickFormatter={(date) => dayjs(date).format("MMM DD")}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis
                  domain={["auto", "auto"]}
                  label={{
                    value: "Value (€)",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                {/* <Tooltip
                  formatter={(value) => [`€${value.toFixed(2)}`, "Value"]}
                  labelFormatter={(date) => dayjs(date).format("MMMM DD, YYYY")}
                /> */}
                <Legend />
                <ReferenceLine
                  y={avgGluten}
                  stroke="red"
                  label={{
                    value: `Avg: €${avgGluten.toFixed(2)}`,
                    position: "insideTopRight",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="glutenTotal"
                  stroke="#8884d8"
                  name="Gluten Value"
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </Paper>
      </Grid>

      {/* Receipt Graph */}
      <Grid size={6}>
        <Paper sx={{ p: 2, height: "100%" }}>
          <Typography variant="h6" gutterBottom>
            Receipt Values - {currentYear}
          </Typography>
          <Box sx={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tickFormatter={(date) => dayjs(date).format("MMM DD")}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis
                  domain={["auto", "auto"]}
                  label={{
                    value: "Value (€)",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                {/* <Tooltip
                  formatter={(value) => [`€${value.toFixed(2)}`, "Value"]}
                  labelFormatter={(date) => dayjs(date).format("MMMM DD, YYYY")}
                /> */}
                <Legend />
                <ReferenceLine
                  y={avgReceipt}
                  stroke="green"
                  label={{
                    value: `Avg: €${avgReceipt.toFixed(2)}`,
                    position: "insideTopRight",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="receiptTotal"
                  stroke="#82ca9d"
                  name="Receipt Value"
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default DashboardPage;
