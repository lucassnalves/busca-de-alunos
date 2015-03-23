using System;
using System.Text;
using System.Collections.Generic;
using System.Linq;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Web;
using BuscaDeAlunos.Business;

namespace TestBuscaDeAlunos
{
    [TestClass]
    public class TestaBusiness
    {
        
        [TestMethod]
        public void TestSalvar()
        {
            string RA = "112150156";
            BuscaDeAlunos.Business.MapaBusiness.Salvar(RA);
            Assert.IsTrue(BuscaDeAlunos.Business.MapaBusiness.ListaAlunos().First().ToString() == RA.ToString());
        }
    }
}
