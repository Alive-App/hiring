import React from 'react';
import { FaWallet } from 'react-icons/fa';
import { Container, Logout } from './styles';

export default function Header() {
  return (
    <Container>
      <Logout>
        <strong>CARTEIRA</strong>
        <FaWallet size={24} color="#fff" />
      </Logout>
    </Container>
  );
}
