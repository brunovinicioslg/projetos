using Microsoft.AspNetCore.Mvc;
using SORTEIO.Models;
using SORTEIO.Repositorio;

namespace SORTEIO.Controllers
{
    public class CodigoController : Controller
    {
        private readonly ICodigoRepositorio _codigoRepositorio;
        public CodigoController(ICodigoRepositorio codigoRepositorio)
        {
            _codigoRepositorio = codigoRepositorio;
        }
        public IActionResult Index()
        {
            return View();
        }


        [HttpPost]
        public IActionResult Criar(CodigoModel cod) {

            _codigoRepositorio.Adicionar(cod);
            return RedirectToAction("Index");
           
        }
    }
}
