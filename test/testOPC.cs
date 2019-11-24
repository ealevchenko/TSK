using ClientOPCTRK;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MessageLog;

namespace test
{
    public class testOPC
    {
        public testOPC()
        {

        }

        public void Test_ClientTRK_ReadTagsRFID()
        {
            try
            {
                ClientTRK client = new ClientTRK();

                RFID rfid = client.ReadTagsRFID(true);
                Console.WriteLine("------------------ RFID ---------------------------");
                if (rfid != null)
                {

                    Console.WriteLine("rfid.part1 - {0}", rfid.part1);
                    Console.WriteLine("rfid.part2 - {0}", rfid.part2);
                    if (rfid.card != null)
                    {
                        Console.WriteLine("rfid.card - {0}", rfid.card);
                        Console.WriteLine("rfid.card.Id - {0}", rfid.card.Id);
                        Console.WriteLine("rfid.card.Active - {0}", rfid.card.Active);
                        Console.WriteLine("rfid.card.AutoNumber - {0}", rfid.card.AutoNumber);
                    }
                    else
                    {
                        Console.WriteLine("rfid.card = null");
                    }
                }
                else
                {
                    Console.WriteLine("rfid = null");
                }
                Console.WriteLine("--------------------------------------------------");
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }

        }

        public void Test_ClientTRK_ReadTagsTank()
        {
            try
            {
                ClientTRK client = new ClientTRK();

                Tank tank = client.ReadTagsTank();

                Console.WriteLine("------------------ Tank ---------------------------");
                if (tank != null)
                {
                    Console.WriteLine("tank.dens - {0}", tank.dens);
                    Console.WriteLine("tank.mass - {0}", tank.mass);
                    Console.WriteLine("tank.level - {0}", tank.level);
                    Console.WriteLine("tank.temp - {0}", tank.temp);
                    Console.WriteLine("tank.volume - {0}", tank.volume);
                    Console.WriteLine("tank.water_level - {0}", tank.water_level);
                    Console.WriteLine("tank.water_volume - {0}", tank.water_volume);
                }
                else
                {
                    Console.WriteLine("tank = null");
                }
                Console.WriteLine("--------------------------------------------------");
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }

        }
    }
}
