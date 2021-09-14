
import Cabecalho from '../../components/cabecalho'
import Menu from '../../components/menu'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css';
import LoadingBar from 'react-top-loading-bar'

import { Container, Conteudo } from './styled'


import Api from '../../service/api'
import { useState , useEffect, useRef, ReactDOM } from 'react';
const api = new Api();

export default function Index() {

    const [produto, setProduto] = useState([]);
    const [nmProduto, setnmProduto] = useState('');
    const [categoria, setCategoria] = useState('');
    const [avaliacao, setAvaliacao] = useState('');
    const [linkimg, setLinkimg] = useState('');
    const [precode, setPrecode] = useState('');
    const [precopor, setPrecopor] = useState('');
    const [estoque, setEstoque] = useState('');
    const [descricao, setDescricao] = useState('');
    const [idAlterando, setIdAlterando] = useState(0);
    const load = useRef(null)


    async function listar(){
        load.current.continuousStart();
    
        let r = await api.listar();
        setProduto(r);
        load.current.complete();
    }

    const validarResposta = (resp) => {
       
        
        if (!resp.erro)
            return true;
            toast.error(`${resp.erro}`);
        return false;
    }

   
    async function inserir(){
        load.current.continuousStart();
        if(precode< 0)
        return  toast.error('Não insira números negativos!')

        if(precopor< 0)
        return  toast.error('Não insira números negativos!')

        if(avaliacao< 0)
        return  toast.error('Não insira números negativos!')

        if(estoque< 0)
        return  toast.error('Não insira números negativos!')

        if(precode === '')
        return toast.error("O campo Preço DE precisa ser preenchido!");
    
        if(precopor === '')
        return toast.error("O campo Preço POR precisa ser preenchido!");
    
        if(avaliacao  === '')
        return toast.error("O campo Avaliação precisa ser preenchido!");
    
        if(estoque  === '')
        return toast.error("O campo Estoque precisa ser preenchido!");

        if(nmProduto  === '')
        return toast.error("O campo Nome precisa ser preenchido!");

        if(categoria  === '')
        return toast.error("O campo Categoria precisa ser preenchido!");

        if(descricao  === '')
        return toast.error("O campo Descrição precisa ser preenchido!");

        if(linkimg  === '')
        return toast.error("O campo Link Imagem precisa ser preenchido!");


        if (idAlterando == 0 ) {
        let r = await api.inserir(nmProduto, categoria, precode, precopor, avaliacao, descricao, estoque, linkimg );

        if (!validarResposta(r)) 
        return      
             else 
             toast.dark('Produto Inserido');
        } else {
            let r = await api.alterar(idAlterando, nmProduto, categoria, precode, precopor, avaliacao, descricao, estoque, linkimg);
            
            if (r.erro) alert(r.erro);
            
             else 
             toast.dark('Produto Alterado')
    
        } 
        load.current.complete();   
        limparCampos();
        listar();
    }

    function limparCampos(){
                setnmProduto('');
                setCategoria('');
                setAvaliacao('');
                setLinkimg('');
                setPrecode('');
                setPrecopor('');
                setEstoque('');
                setDescricao('');
                setIdAlterando(0);
    }

    async function remover(id){
        confirmAlert({
            title: 'Remover Produto?',
            message: `Tem certeza que deseja excluir o produto ${id}?`, 
            buttons:[
                {
                    label: 'Sim',
                    onClick: async () =>{
                        let r = await api.remover(id);
                        if (r.erro)
                        toast.erro(`${r.erro}`);
                    else {
                        toast.dark('Produto Removido!')
                        listar();
                    }
                    }
                },
                {
                    label: 'Não'
                }
            ]
        })
    }

    async function editar(item) {
        
                setnmProduto(item.nm_produto);
                setCategoria(item.ds_categoria);
                setLinkimg(item.img_produto);
                setPrecode(item.vl_preco_de);
                setIdAlterando(item.id_produto);
                setPrecopor(item.vl_preco_por);
                setEstoque(item.qtd_estoque);
                setDescricao(item.ds_produto);
                setAvaliacao(item.vl_avaliacao);
    }

    useEffect(() =>{
        listar();
     }, [])

    return (
        <Container>
            <ToastContainer />
            <LoadingBar color="#10EAEA" ref = {load} />
            <Menu />
            <Conteudo>
                <Cabecalho />
                <div class="body-right-box">
                    <div class="new-student-box">
                        
                        <div class="text-new-student">
                            <div class="bar-new-student"></div>
                            <div class="text-new-student"> {idAlterando == 0 ? "Novo Produto" : "Alterando Produto"  + idAlterando} </div>
                        </div>

                        <div class="input-new-student"> 
                            <div class="input-left">
                                <div class="agp-input"> 
                                    <div class="name-student"> Nome: </div>  
                                    <div class="input"> <input type="text" value={nmProduto} onChange={e => setnmProduto(e.target.value)}/> </div>  
                                    <div class="corse-student" style={{marginLeft:"30px", marginRight:"27px"}}> Preço DE: </div>  
                                    <div class="input"> <input type="text" value={precode} onChange={e => setPrecode(e.target.value)}/> </div>
                                </div> 
                                <div class="agp-input">
                                    <div class="number-student"> Categoria: </div>  
                                    <div class="input"> <input type="text" value={categoria} onChange={e => setCategoria(e.target.value)}/> </div> 
                                    <div class="class-student" style={{marginLeft: "30px"}}> Preço POR: </div>  
                                    <div class="input"> <input type="text" value={precopor} onChange={e => setPrecopor(e.target.value)}/> </div>
                                </div>
                                <div class="agp-input">
                                    <div class="number-student"> Avaliação: </div>  
                                    <div class="input"> <input type="text" value={avaliacao} onChange={e => setAvaliacao(e.target.value)}/> </div> 
                                    <div class="class-student" style={{marginLeft: "30px", marginRight:"34px"}}> Estoque: </div>  
                                    <div class="input"> <input type="text" value={estoque} onChange={e => setEstoque(e.target.value)}/> </div> 
                                </div>
                                <div class="agp-input">
                                    <div class="number-student"> Link Imagem: </div>  
                                    <div class="input"> <input style={{width:"549px"}} type="text" value={linkimg} onChange={e => setLinkimg(e.target.value)}/> </div> 
                                </div>
                                <div class="agp-input">
                                    <div class="number-student2"> Descrição: </div>  
                                    <div class="inputNOVO"> <textarea style={{ resize: "none", width:"549px", height: "154px"}} rows="5" cols="33" type="text" value={descricao} onChange={e => setDescricao(e.target.value)}/> </div> 
                                </div>
                            </div>

                            
                            
                            <div class="button-create"> <button onClick={inserir}> {idAlterando == 0 ? "Cadastrar" : "Alterar"} </button> </div>
                        </div>
                    </div>

                    <div class="student-registered-box">
                        <div class="row-bar"> 
                            <div class="bar-new-student"> </div>
                            <div class="text-registered-student"> Produtos Cadastrados </div>
                        </div>
                    
                        <table class ="table-user">
                            <thead>
                                <tr>
                                    <th className = "coluna-acao"></th>
                                    <th> ID </th>
                                    <th> Produto </th>
                                    <th> Categoria </th>
                                    <th> Preço </th>
                                    <th> Estoque </th>
                                    <th class="coluna-acao"> </th>
                                    <th class="coluna-acao"> </th>
                                </tr>
                            </thead>
                    
                            <tbody>
                                {produto.map((item, i) =>
                                    
                                <tr classname={i % 2 == 0 ? "linha-alternada" : ""}>
                                    <td>
                    {" "}
                    <img src={item.img_produto} style={{width: '40px', height:'40px' }} />{" "}
                  </td>
                                    <td> {item.id_produto} </td>
                                    <td title={item.nm_produto}>
                                             {item.nm_produto != null && item.nm_produto.length >= 25 
                                                ? item.nm_produto.substr(0, 25) + '...' 
                                                : item.nm_produto}
                                    </td>
                                    <td> {item.ds_categoria} </td>
                                    <td> {"R$" + item.vl_preco_por} </td>
                                    <td> {item.qtd_estoque} </td>
                                    <td className="coluna-acao"> <button onClick={() => editar(item) }> <img src="/assets/images/edit.svg" alt="" /> </button> </td>
                                    <td className="coluna-acao"> <button onClick={() => remover(item.id_produto) }> <img src="/assets/images/trash.svg" alt="" /> </button> </td>
                                </tr>

                            )}
                               
                                
                            </tbody> 
                        </table>
                    </div>
                </div>
            </Conteudo>
        </Container>
    )
}
