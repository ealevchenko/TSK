using ClientOPCTRK;
using ClientSAPTRK;
using EFDCFuel.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace test
{
    class Program
    {

        static void Main(string[] args)
        {
            try
            {

                #region TEST OPC

                testOPC test_opc = new testOPC();
                test_opc.Test_ClientTRK_ReadTagsRFID();
                test_opc.Test_ClientTRK_ReadTagsTank();

                #endregion

                #region TEST SAP
                //testSAP test_sap = new testSAP();
                //test_sap.Test_ClientSAP_GetReservation();
                //test_sap.Test_ClientSAP_GetSupply();
                //test_sap.Test_ClientSAP_GetReservationOfDebitor();
                //test_sap.Test_ClientSAP_GetReservationOfValumeMassDebitor();
                #endregion

            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
            Console.WriteLine("End press and key");
            Console.ReadKey();
        }
    }
}
