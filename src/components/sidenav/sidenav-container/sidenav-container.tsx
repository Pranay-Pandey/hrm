import { ReactNode, ReactElement } from "react";
import { Box, Grid, GridItem } from "@chakra-ui/react";

export interface SidenavContainerProps {
  sidenav: ReactElement;
}

export function SidenavContainer({ sidenav }: SidenavContainerProps) {
  return (
    <Grid templateAreas={`'sidebar main'`} templateColumns="auto 1fr" position="fixed" zIndex={100000}>
      <GridItem area="sidebar" as="aside" p={0} position="absolute" pt={0} zIndex={10000}>
        <Box
          pos="sticky"
          top={100}
          w={{ base: 0, md: "72px" }}
          p={{ base: 0, md: 2 }}
          paddingTop={8}
          height="100vh"
          overflow="auto"
          css={{
            "&::-webkit-scrollbar": {
              height: "var(--chakra-sizes-1)",
              width: "var(--chakra-sizes-1)"
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "var(--chakra-colors-gray-400)"
            }
          }}
        >
          {sidenav}
        </Box>
      </GridItem>
    </Grid>
  );
}

export default SidenavContainer;
