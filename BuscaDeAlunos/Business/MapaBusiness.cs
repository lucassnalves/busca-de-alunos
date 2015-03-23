using System.Collections.Generic;
using System.Linq;
using System.IO;
using System.Web.Configuration;

namespace BuscaDeAlunos.Business
{
    public class MapaBusiness
    {
        public static void Salvar(string RA)
        {
            string path = WebConfigurationManager.AppSettings["CaminhoLog"];
            StreamWriter arquivoRA = new StreamWriter(path + @"\log.txt", true);
            arquivoRA.Write(RA + ";");
            arquivoRA.Close();
        }

        public static List<string> ListaAlunos()
        {
            string path = WebConfigurationManager.AppSettings["CaminhoLog"];
            if(!System.IO.File.Exists(path + @"\log.txt"))
                return new List<string>();

            string texto = System.IO.File.ReadAllText(path + @"\log.txt");
            
            return (from lista in texto.Split(new char[] { ';' }).Reverse<string>().Distinct().ToArray() where lista != "" select lista).Take(10).ToList();
            
        }
    }
}