import React , { useEffect } from "react";
import Router from 'next/router'

import Vaults from "components/pages/Vaults";

import Head from "next/head";
import { NextPage } from "next";

const VaultsPage: NextPage = () => {

  // temporarily disable access to vaults route, remove this once ready
  useEffect(() => {
    const {pathname} = Router
    if(pathname == '/vaults' ){
        Router.push('/')
    }
  });

  return (
    <>
      <Head>
        <title>WhiteWhale Protocol</title>
      </Head>
      <Vaults />
    </>
  );
};

export default VaultsPage;
