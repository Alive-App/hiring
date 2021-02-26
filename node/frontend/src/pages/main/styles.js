import styled, { keyframes, css } from 'styled-components';

export const Container = styled.div`
display:flex;
flex-direction:column;
align-items:center;

>h1{
    align-self:flex-start;
    color:#FFFF;
    font-size:24px;
    font-weight:bold;
}
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to{
    transform: rotate(360deg)
  }
`;

export const SearchButton = styled.button.attrs((props) => ({
  disabled: props.loading,
}))`
    width:50px;
    margin-left:8px;
    color:#191920;
    border:none;
    border-radius:4px;
    background-color:#ffff;   

    &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }
     ${(props) => props.loading
    && css`
      svg {
        animation: ${rotate} 2s infinite;
      }
    `} 

`;
export const SerchContainer = styled.div`
position:absolute;
display:flex;
flex-direction:column;
align-items:center;
width:50%;   
form{
    display:flex;
   
}

h1{
    margin:0 0 16px 0px;
}

input{
    color:#191920;
    height:40px;
    border-radius:8px;
    border: solid 1px #191920;
    padding:16px;
    font-size:20px;
    width:100%;   
}
>div{
    width:90%;   
    display:flex;
    flex-direction:column;
    flex:1;
    justify-content:start;
    background-color:#ffff;
    padding:8px;
    >button{
        margin:4px;
        background:none;
        border:none;
        color:#191920;
        width:100%;   
        justify-content:start;
        display:flex;
        position:static;
        z-index:1;
    }&:hover{
        opacity:0.8;
    }   
}

`;

export const GeneralContainer = styled.div`
    width: 60%;
    display: flex;
    flex-direction:column;
    list-style: none;
    margin: 0 0 24px 0;
    align-items:center;
    margin-top:180px;
    background-color:#FFFF;
    color:#191920;
    height:400px;
    border-radius:8px;
    padding:16px;
    >img{
        margin-top:16px;
    }

    >button{
        font-size:12px;
        margin:4px;
        background:none;
        border:none;
        color:#191920;
        align-self:flex-end;
        display:flex;
        transition: opacity 0.2s;
        &:hover {
        opacity: 0.7;
  }
    svg{
            margin: 0 8px;
        }
    }

    h1{
        margin: 64px 0;
    }
    div{
        display:flex;
        flex-direction:column;
        align-items:center;
        >p{
            margin-top:16px;
        }
    }
`;

export const ButtonsContainer = styled.ul`
    display:flex;
    flex-direction:row;
    margin-top:56px;
    >a{
        background-color:#191920;
        color:#ffff;
        border:none;
        padding:8px;
        margin:16px;
        border-radius:4px;
        font-weight:bold;
        text-decoration:none;
        &:hover{
        opacity:0.8;  
    }
        
    }
   

`;
