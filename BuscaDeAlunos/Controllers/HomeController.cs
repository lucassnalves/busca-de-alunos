using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BuscaDeAlunos.Business;

namespace BuscaDeAlunos.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /Home/

        public ActionResult Index()
        {
            return View();
        }

        public void Savar(string RA)
        {

            MapaBusiness.Salvar(RA);
        }

        public ActionResult ListaAlunos()
        {
            return PartialView(MapaBusiness.ListaAlunos());
        }

    }
}
