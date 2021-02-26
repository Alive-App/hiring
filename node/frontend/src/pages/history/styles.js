import styled from 'styled-components';

export const Container = styled.div`
display:flex;
flex-direction:column;
align-items:center;

>h1{
    align-self:center;
    color:#FFFF;
    font-size:24px;
    font-weight:bold;
    margin-bottom:32px;

}
form{
    display:flex;
    align-items:center;

    >input{
        height:40px;
        color:#191920;
        margin:0 16px;
        border-radius:4px;
        border:none;
        padding:8px;
    }
    button{
        height:32px;
        padding:8px;
        font-size:16px;
        font-weight:bold;
        display:flex;
        align-items:center;
        color:#191920;
        background-color:#FFFF;
        border-radius:4px;
        border:none;

        &:hover{
            opacity:0.8;
        }
        
    }
}
`;

export const GeneralContainer = styled.div`
    position:relative;
    z-index:-1;
    width: 60%;
    display: flex;
    flex-direction:column;
    list-style: none;
    margin: 0 0 24px 0;
    align-items:center;
    margin-top:60px;
    background-color:#FFFF;
    color:#191920;
    min-height:400px;
    border-radius:8px;
    padding:16px;
    >img{
        margin-top:16px;
    }
    }

    h1{
        margin: 16px 0;
        align-self:center;
    }
    div{
        display:flex;
        flex-direction:column;
        align-items:flex-start;
        >p{
            margin-top:16px;
        }
    }
`;

export const ButtonsContainer = styled.ul`
    display:flex;
    flex-direction:row;
    margin-top:56px;
    >button{
        background-color:#191920;
        color:#ffff;
        border:none;
        padding:8px;
        margin:16px;
        border-radius:4px;
        font-weight:bold;
    }

`;
