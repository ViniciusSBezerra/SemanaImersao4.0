import React, {useState} from 'react';
import { Collapse,Navbar,NavbarToggler,NavbarBrand,Nav,NavItem,NavLink,Container,
         Jumbotron,
         Form, FormGroup, Label, Input, Button, Alert
} from 'reactstrap';

const HomePage = (props) => {

    const [orcamento, setOrcamento] = useState({
      name: '',
      email:'',
      phone:'',
      whatsapp:'',
      message:'',

    })

    const[response, setResponse] = useState({
      formSave: false,
      type:'',
      message: '',
    })

    const onChangeInput = e => setOrcamento({ ...orcamento, [e.target.name]: e.target.value})

    const sendOrcamento = async e =>{
      e.preventDefault();

      setResponse({formSave: true})
      try {
        const res = await fetch('http://localhost:8080/orcamento',{
          method: 'POST',
          body: JSON.stringify(orcamento),
          headers: {'CONTENT-TYPE' : 'application/json'}
        })

        const responseEnv = await res.json()

        if(responseEnv.error){
          setResponse({
            formSave: false,
            type: 'error',
            message: responseEnv.message
          })
        }else{
          setResponse({
            formSave: false,
            type: 'success',
            message: responseEnv.message
          })
        }
  
        
      } catch (error) {

        setResponse({
          formSave: false,
          type: 'error',
          message: "Erro: Solicitação de orçamento nao foi enviada"
        })
        
      }

    }

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
      <div>
       
      <Navbar color="info" dark expand="md">
      <Container>
        <NavbarBrand href="/">reactstrap</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/">Orçamento</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
      </Navbar>

      <Jumbotron className= "pg-orcamento">
        <style >
          {`.pg-orcamento{
              background-color: #f5fbfa;
              color: #17a2b8;
              padding-top: 50px;
              paddind-bot: 100px;
              margin-bottom: 0rem !important;
          }`}
          </style>
        <Container>
          <h1 className="display-4 text-center">Nossos consultores estão prontos para lhe ajudar!</h1>
          <p className="lead text-center mb-4">Deixe seus contatos abaixo que retornaremos com uma proposta específica para sua nessecidade.</p>
          
          {response.type === 'error'? <Alert color="danger"> {response.message} </Alert> : ""}
          {response.type === 'success'? <Alert color="success"> {response.message} </Alert> : ""}
          <Form onSubmit = {sendOrcamento}>
            <FormGroup>
              <Label for="name">Nome</Label>
              <Input type="text" name="name" id="name" placeholder="Digite seu nome Completo" onChange={onChangeInput}/>
            </FormGroup>

            <FormGroup>
              <Label for="email">E-mail</Label>
              <Input type="text" name="email" id="email" placeholder="informe seu E-mail" onChange={onChangeInput} />
            </FormGroup>

            <FormGroup>
              <Label for="phone">Telefone</Label>
              <Input type="text" name="phone" id="phone" placeholder="(11) 91237-1234" onChange={onChangeInput} />
            </FormGroup>

            <FormGroup>
              <Label for="whatsapp">WhatsApp</Label>
              <Input type="text" name="whatsapp" id="whatsapp" placeholder="(11) 91237-1234" onChange={onChangeInput} />
            </FormGroup>

            <FormGroup>
              <Label for="message">Infome sua proposta</Label>
              <Input type="textarea" name="message" id="message" placeholder="Digite aqui a sua proposta" onChange={onChangeInput} />
            </FormGroup>

             
              {response.formSave ?   <Button type="submit" outline color="info" disabled>Enviando</Button>:
              <Button type="submit" outline color="info">Enviar!</Button>}

          </Form>
      
        
        </Container>
      </Jumbotron>
        
      <Jumbotron fluid className="rodape bg-info">

        <style>{`rodape{
          color: #fff;
          padding-top: 10px;
          padding-bottom: 10px;
          margin-bottom: 0rem !important
        }`}</style>

        <Container className="lead text-center"></Container>
      </Jumbotron>


      </div>
    )
  }
  
  export default HomePage