using ClientSAPTRK;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace test
{
    public class testSAP
    {
        public testSAP()
        {

        }


        public void Test_ClientSAP_GetReservation()
        {
            ClientSAP sap = new ClientSAP();

            Reservation reserv = sap.GetReservation("3052703", "1", "5");

            Console.WriteLine("RSNUM = {0}", reserv.RSNUM);
            Console.WriteLine("RSPOS = {0}", reserv.RSPOS);
            Console.WriteLine("MATNR = {0}", reserv.MATNR);
            Console.WriteLine("WERKS = {0}", reserv.WERKS);
            Console.WriteLine("LGORT = {0}", reserv.LGORT);
            Console.WriteLine("UMLGO = {0}", reserv.UMLGO);
            Console.WriteLine("UMWRK = {0}", reserv.UMWRK);
            Console.WriteLine("BDMNG = {0}", reserv.BDMNG);
            Console.WriteLine("ENMNG = {0}", reserv.ENMNG);
            Console.WriteLine("LGOBE = {0}", reserv.LGOBE);
            Console.WriteLine("MEINS = {0}", reserv.MEINS);
            Console.WriteLine("BWART = {0}", reserv.BWART);

        }

        public void Test_ClientSAP_GetSupply()
        {
            ClientSAP sap = new ClientSAP();

            List<Supply> list_sypply = sap.GetSupply("8000000020");

            Console.WriteLine("list_post = {0}", list_sypply.Count());

            foreach (Supply p in list_sypply)
            {
                Console.WriteLine("vbeln = {0}", p.vbeln);
                Console.WriteLine("posnr = {0}", p.posnr);
                Console.WriteLine("MATNR = {0}", p.MATNR);
                Console.WriteLine("WERKS = {0}", p.WERKS);
                Console.WriteLine("LGORT = {0}", p.LGORT);
                Console.WriteLine("KUNNR = {0}", p.KUNNR);
                Console.WriteLine("LFIMG = {0}", p.LFIMG);
                Console.WriteLine("LGOBE = {0}", p.LGOBE);
                Console.WriteLine("MEINS = {0}", p.MEINS);

            }

        }

        public void Test_ClientSAP_GetReservationOfDebitor()
        {
            ClientSAP sap = new ClientSAP();

            //Reservation reserv = sap.GetReservationOfDebitor("101296", "", "1");
            //Reservation reserv = sap.GetReservationOfDebitor("101697", "107000024", "5");
            Reservation reserv = sap.GetReservationOfDebitor("101635", "107000024", "5");

            Console.WriteLine("RSNUM = {0}", reserv.RSNUM);
            Console.WriteLine("RSPOS = {0}", reserv.RSPOS);
            Console.WriteLine("MATNR = {0}", reserv.MATNR);
            Console.WriteLine("WERKS = {0}", reserv.WERKS);
            Console.WriteLine("LGORT = {0}", reserv.LGORT);
            Console.WriteLine("UMLGO = {0}", reserv.UMLGO);
            Console.WriteLine("UMWRK = {0}", reserv.UMWRK);
            Console.WriteLine("BDMNG = {0}", reserv.BDMNG);
            //Console.WriteLine("ENMNG = {0}", reserv.ENMNG);
            Console.WriteLine("LGOBE = {0}", reserv.LGOBE);
            Console.WriteLine("MEINS = {0}", reserv.MEINS);
            Console.WriteLine("BWART = {0}", reserv.BWART);

        }

        public void Test_ClientSAP_GetReservationOfValumeMassDebitor()
        {
            ClientSAP sap = new ClientSAP();

            //Reservation reserv = sap.GetReservationOfDebitor("101296", "", "1");
            //Reservation reserv = sap.GetReservationOfDebitor("101697", "107000024", "5");
            Reservation reserv = sap.GetReservationOfValumeMassDebitor(125.55, 100.66, "101852", "107000023", "5");

            Console.WriteLine("RSNUM = {0}", reserv.RSNUM);
            Console.WriteLine("RSPOS = {0}", reserv.RSPOS);
            Console.WriteLine("MATNR = {0}", reserv.MATNR);
            Console.WriteLine("WERKS = {0}", reserv.WERKS);
            Console.WriteLine("LGORT = {0}", reserv.LGORT);
            Console.WriteLine("UMLGO = {0}", reserv.UMLGO);
            Console.WriteLine("UMWRK = {0}", reserv.UMWRK);
            Console.WriteLine("BDMNG = {0}", reserv.BDMNG);
            //Console.WriteLine("ENMNG = {0}", reserv.ENMNG);
            Console.WriteLine("LGOBE = {0}", reserv.LGOBE);
            Console.WriteLine("MEINS = {0}", reserv.MEINS);
            Console.WriteLine("BWART = {0}", reserv.BWART);

        }

    }
}
