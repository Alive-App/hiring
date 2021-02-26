import React from 'react';
import { FaWallet } from 'react-icons/fa';
import { Container, Wallet } from './styles';

export default function Header() {
  return (
    <Container>
      <Wallet to="/wallet">
        <strong>CARTEIRA</strong>
        <FaWallet size={24} color="#fff" />
      </Wallet>
    </Container>
  );
}
