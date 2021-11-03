import React, { FC, useState } from "react";
import { Box, HStack, Flex, Text, Image } from "@chakra-ui/react";

import { format } from "libs/parse";
import { useVault } from "modules/vault";
import { useUstPrice } from "hooks/useUstPrice";

import Card from "components/Card";
import SimpleStat from "components/SimpleStat";
import ChartVault from "components/vault/chart/ChartVault";
import DepositModal from "components/vault/DepositModal";
import WithdrawModal from "components/vault/WithdrawModal";
import useVaultApy from "hooks/useVaultApy";

type Props = {
  data: any;
};

const VaultItemLine = ({ label, value, asset = "UST" }) => {
  return (
    <Flex
      justify="space-between"
      align="center"
      py="2"
      borderBottom="1px solid"
      borderBottomColor="whiteAlpha.300"
      _last={{
        borderBottom: "none",
      }}
    >
      <Text color="#fff">{label}</Text>
      <SimpleStat
        value={value}
        asset={asset}
        fontSizeValue="lg"
        fontSizeAsset="sm"
      />
    </Flex>
  );
};

const VaultItem: FC<Props> = ({ data }) => {
  const { vault, balance, totalBalance } = useVault({
    contract: data.contract,
  });
  const balanceAmount = format(balance, "uusd");
  const totalBalanceAmount = format(totalBalance, "uusd");
  const ustPrice = useUstPrice();
  const isComing = data.contract == null;
  const apy = useVaultApy();
  const apyInPercent = (apy * 100).toFixed(2);

  return (
    <Card
      noPadding
      whileHover={{
        scale: 1.05,
      }}
    >
      <Box filter={isComing && "blur(3px)"}>
        <Box bg="rgba(0,0,0,0.2)" p="8" borderBottomRadius="2xl">
          <Flex justify="space-between">
            <HStack spacing="2" mb="4">
              <Image src={data.logo} alt={data.logo} boxSize="1.875rem" />
              <Text color="#fff" fontSize="xl" fontWeight="bold">
                {data.name}
              </Text>
            </HStack>
            <Text color="brand.500" fontSize="2xl" fontWeight="bold">
              {data.name == "UST" ? `$${ustPrice}` : "--"}
            </Text>
          </Flex>
          <ChartVault value={data.name == "UST" ? Number(ustPrice) : 0} />
        </Box>
        <Box p="8">
          <Box>
            <VaultItemLine label="APY" value={apyInPercent} asset="%" />
            <VaultItemLine label="Total Deposits" value={totalBalanceAmount} />
            <VaultItemLine label="My Deposit" value={balanceAmount} />
          </Box>
          <HStack mt="6">
            <WithdrawModal vault={vault} />
            <DepositModal token="uusd" vault={vault} />
          </HStack>
        </Box>
      </Box>
      {isComing && (
        <Flex
          position="absolute"
          top="0"
          right="0"
          bottom="0"
          left="0"
          justify="center"
          align="center"
        >
          <Text color="white" fontSize="xl" fontWeight="700">
            Coming soon...
          </Text>
        </Flex>
      )}
    </Card>
  );
};

export default VaultItem;
