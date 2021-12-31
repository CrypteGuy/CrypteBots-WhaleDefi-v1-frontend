import React from "react";
import {
  Box,
  Grid,
  GridItem,
  Heading,
  Flex,
  HStack,
  Text,
  Select,
  Stack,
  Image,
  chakra,
} from "@chakra-ui/react";
import Link from "next/link";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { NextPage } from "next";

import { useGovStaked, useGovTotalStaked } from "modules/govern";
import { useWhalePrice } from "hooks/useWhalePrice";
import { fromTerraAmount } from "libs/terra";

import Card from "components/Card";
import SimpleStat from "components/SimpleStat";
import CustomCardPoll from "components/gov/CustomCardPoll";
import Warchest from "components/gov/Warchest";
import Polls from "components/gov/Polls";
import CardLine from "components/gov/CardLine";
import LineChart from "components/LineChart";
import UnstakeModal from "components/gov/UnstakeModal";
import StakeModal from "components/gov/StakeModal";
import CommunityFund from "components/gov/CommunityFund";
import PollList from "components/gov/PollList";

const dataChart = [
  {
    label: "Apr",
    value: 1.32,
  },
  {
    label: "May",
    value: 4.12,
  },
  {
    label: "Jun",
    value: 2.22,
  },
  {
    label: "Jul",
    value: 3.22,
  },
  {
    label: "Aug",
    value: 1.22,
  },
  {
    label: "Sep",
    value: 7.22,
  },
  {
    label: "Sep",
    value: 7.255,
  },
];

const Gov: NextPage = () => {
  const totalStakedAmount = useGovTotalStaked();
  const stakedAmount = useGovStaked();
  const price = useWhalePrice();

  return (
    <Box mt="16" mx="auto" maxW="container.xl">
      <Heading color="#fff" size="lg" mb="10">
        Governance
      </Heading>

      <Grid templateColumns="repeat(12, 1fr)" gridAutoRows="1fr" gap={12}>
        <GridItem colSpan={[12, null, 12]}>
          <Warchest />
        </GridItem>
        {/* <GridItem colSpan={[12, null, 6]}>
          <CommunityFund />
        </GridItem> */}
      </Grid>

      <Flex justify="space-between" mt="24" mb="6">
        <Heading color="#fff" size="lg">
          Polls
        </Heading>
        <HStack>
          <Box
            as="button"
            mr="17px"
            borderRadius="full"
            color="white"
            border="1px solid #fff"
            alignSelf="center"
            padding="2px 20px"
          >
            <Link href="/gov/createPoll" passHref>
              <a>Create Poll</a>
            </Link>
          </Box>
        </HStack>
      </Flex>
      <Polls />
    </Box>
  );
};

export default Gov;
