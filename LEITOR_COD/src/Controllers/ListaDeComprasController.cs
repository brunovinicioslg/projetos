using LEITOR.FIlters;
using LEITOR.Helper;
using LEITOR.Models;
using LEITOR.Repositorio;
using Microsoft.AspNetCore.Mvc;

namespace LEITOR.Controllers
{
    [PaginaParaUsuarioLogado]

    public class ListadeComprasController : Controller
    {
        private readonly IListaRepositorio _listaRepositorio;
        private readonly ISessao _sessao;
        public ListadeComprasController(IListaRepositorio listaRepositorio,
                                        ISessao sessao)
        {
            _listaRepositorio = listaRepositorio;
            _sessao = sessao;
        }
        public IActionResult Index()
        {
            UsuarioModel usuarioLogado = _sessao.BuscarSessaoUsuario();
            List<ListaModel> produtos = _listaRepositorio.BuscarTodos(usuarioLogado.Id);
            return View(produtos);
        }

        public IActionResult Editar(int id)
        {
            ListaModel produto = _listaRepositorio.BuscarPorId(id);
            return View(produto);
        }

        public IActionResult Criar()
        {
            return View();
        }
        public IActionResult Apagar(int id)
        {
            _listaRepositorio.Apagar(id);
            return RedirectToAction("Index");
        }
        public IActionResult EditarQuantidadeP(int id)
        {
            _listaRepositorio.EditarQuantidadeP(id);
            return RedirectToAction("Index");
        }
        public IActionResult EditarQuantidadeN(int id)
        {
            _listaRepositorio.EditarQuantidadeN(id);
            return RedirectToAction("Index");
        }

        public IActionResult EditarStatus(int id)
        {
            _listaRepositorio.EditarStatus(id);
            return RedirectToAction("Index");
        }

        [HttpPost("OnChangeCheckBox/{value}")]
        public IActionResult OnChangeCheckBox(bool value)
        {
            try
            {
                return BadRequest("error");
                //return Ok("");

            }


            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public IActionResult Criar(ListaModel produto) {

            UsuarioModel usuarioLogado = _sessao.BuscarSessaoUsuario();
            produto.UsuarioId = usuarioLogado.Id;
            _listaRepositorio.Adicionar(produto);
            return RedirectToAction("Index");


        }

        [HttpPost]
        public IActionResult Editar(ListaModel produto)
        {
            UsuarioModel usuarioLogado = _sessao.BuscarSessaoUsuario();
            produto.UsuarioId = usuarioLogado.Id;
            _listaRepositorio.Editar(produto);
            return RedirectToAction("Index");

        }


    }
}
