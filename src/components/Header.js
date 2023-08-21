import React from "react";
import styled from "styled-components";
import { Avatar } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SearchIcon from "@mui/icons-material/Search";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
function Header() {

  const [user] = useAuthState(auth);

  return (
    <div>
      <HeaderContainer>
        <HeaderLeft>
          <HeaderAvatar 
          onClick={()=> auth.signOut()}
          src={user?.photoURL}
          alt={user?.displayName}
          />
          <AccessTimeIcon />
        </HeaderLeft>

        <HeaderSearch>
          <SearchIcon />
          <input placeholder="Search PAPAFAM" />
        </HeaderSearch>

        <HeaderRight>
          <HelpOutlineIcon />
        </HeaderRight>

      </HeaderContainer>
    </div>
  );
}

export default Header;


const HeaderRight = styled.div`
  display: flex;
  flex: 0.3;
  align-item: flex-end;

  > .MuiSvgIcon-root{
    margin-left: auto;
    margin-right: 20px;
  }
`;

const HeaderSearch = styled.div`
  display: flex;
  flex: 0.4;
  border-radius: 6px;
  opacity: 1;
  background-color: #421f44;
  text-align: center;
  padding: 0 50px;
  color: gray;
  border: 1px solid gray;

  > input {
    text-align: center;
    border: none;
    background-color: transparent;
    min-width: 30vh;
    outline: 0;
    color: white;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  position: fixed;
  justify-content: space-between;
  width: 100%;
  padding: 10px 0;
  align-item: center;
  background-color: var(--slack-color);
  color: white;
`;

const HeaderLeft = styled.div`
  flex: 0.3;
  display: flex;
  align-item: center;
  margin-left: 20px;

  > .MuiSvgIcon-root {
    margin-left: auto;
    margin-right: 30px;
  }
`;

const HeaderAvatar = styled(Avatar)`
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }
`;
