using Opc.Da;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MessageLog;
using Opc;
using EFDCFuel.Entities;
using EFDCFuel.Concrete;

namespace ClientOPCTRK
{

    public class RFID
    {
        public UInt16? part1 { get; set; }
        public UInt16? part2 { get; set; }
        public azsCards card { get; set; }
    }

    public class Tank
    {
        public double? dens { get; set; }
        public double? mass { get; set; }
        public double? level { get; set; }
        public double? temp { get; set; }
        public double? volume { get; set; }
        public double? water_level { get; set; }        
        public double? water_volume { get; set; }
    }

    public class ClientTRK
    {
        private OpcCom.Factory fact = new OpcCom.Factory();
        private Opc.URL url;

        public ClientTRK()
        {
            url = new Opc.URL("opcda://localhost/Kepware.KEPServerEX.V6");
        }

        public RFID ReadTagsRFID(bool identify_card)
        {
            try
            {

                Opc.Da.Server server = null;
                OpcCom.Factory fact = new OpcCom.Factory();
                server = new Opc.Da.Server(fact, null);

                server.Connect(url, new Opc.ConnectData(new System.Net.NetworkCredential()));

                //
                Opc.Da.Subscription group;
                Opc.Da.SubscriptionState groupState = new Opc.Da.SubscriptionState();
                groupState.Name = "RFID";
                groupState.Active = true;
                group = (Opc.Da.Subscription)server.CreateSubscription(groupState);

                //добавление айтемов в группу
                Opc.Da.Item[] items = new Opc.Da.Item[2];
                items[0] = new Opc.Da.Item();
                items[0].ItemName = "ZREADER.RFID_reader.part1";
                items[1] = new Opc.Da.Item();
                items[1].ItemName = "ZREADER.RFID_reader.part2";
                items = group.AddItems(items);
                //List<oldRFID> result_list = new List<oldRFID>();
                ItemValueResult[] res = group.Read(items);
                RFID rfid = new RFID();
                EFazsCards ef_card = new EFazsCards();
                if (res != null)
                {
                    //UInt16? part1 = res[0].Value != null ? res[0].Value as UInt16? : 37;
                    //UInt16? part2 = res[1].Value != null ? res[1].Value as UInt16? : 50907;
                    UInt16? part1 = res[0].Value != null ? res[0].Value as UInt16? : null;
                    UInt16? part2 = res[1].Value != null ? res[1].Value as UInt16? : null;
                    if (part1 != null && part2 != null)
                    {
                        rfid.part1 = part1;
                        rfid.part2 = part2;
                        if (identify_card)
                        {
                            int code1 = int.Parse(part1.ToString());
                            int code2 = int.Parse(part2.ToString());
                            String.Format("Определим ID=карты code1={0}, code2={1}", code1, code2).SaveInformation();
                            azsCards card = ef_card.Get().Where(c => c.Number == (code1).ToString("00") + "," + (code2).ToString("00000")).FirstOrDefault();
                            if (card == null)
                            {
                                card = ef_card.Get().Where(c => c.Number == (code1).ToString("000") + "," + (code2).ToString("00000")).FirstOrDefault();
                            }
                            rfid.card = card;
                        }

                    }
                }
                return rfid;
            }
            catch (Exception e)
            {
                String.Format("Ошибка выполнения метода ReadTagsRFID(identify_card={0})", identify_card).SaveError(e);
                return null;
            }
        }

        public Tank ReadTagsTank()
        {
            try
            {
                Opc.Da.Server server = null;
                OpcCom.Factory fact = new OpcCom.Factory();
                server = new Opc.Da.Server(fact, null);

                server.Connect(url, new Opc.ConnectData(new System.Net.NetworkCredential()));

                //
                Opc.Da.Subscription group;
                Opc.Da.SubscriptionState groupState = new Opc.Da.SubscriptionState();
                groupState.Name = "Tank";
                groupState.Active = true;
                group = (Opc.Da.Subscription)server.CreateSubscription(groupState);

                //добавление айтемов в группу
                Opc.Da.Item[] items = new Opc.Da.Item[7];
                items[0] = new Opc.Da.Item();
                items[0].ItemName = "Gamma.UIP1.Dens.Dens__1_";
                items[1] = new Opc.Da.Item();
                items[1].ItemName = "Gamma.UIP1.Mass.Mass__1_";
                items[2] = new Opc.Da.Item();
                items[2].ItemName = "Gamma.UIP1.OilLevel.OilLevel__1_";
                items[3] = new Opc.Da.Item();
                items[3].ItemName = "Gamma.UIP1.Temper.Temper__1_";
                items[4] = new Opc.Da.Item();
                items[4].ItemName = "Gamma.UIP1.volume.volume__1_";
                items[5] = new Opc.Da.Item();
                items[5].ItemName = "Gamma.UIP1.Water.Water__1_";
                items[6] = new Opc.Da.Item();
                items[6].ItemName = "Gamma.UIP1.WaterVol.WaterVol__1_";

                items = group.AddItems(items);


                ItemValueResult[] res = group.Read(items);
                if (res != null && res.Count() > 0)
                {
                    Tank tank = new Tank()
                    {
                        dens = res[0].Value != null ? res[0].Value as double? : null,
                        mass = res[1].Value != null ? res[1].Value as double? : null,
                        level = res[2].Value != null ? res[2].Value as double? : null,
                        temp = res[3].Value != null ? res[3].Value as double? : null, // преабразуем
                        volume = res[4].Value != null ? res[4].Value as double? : null,
                        water_level = res[5].Value != null ? res[5].Value as double? : null, // преабразуем
                        water_volume = res[6].Value != null ? res[6].Value as double? : null,
                        //dens = res[0].Value != null ? res[0].Value as double? : 790,
                        //mass = res[1].Value != null ? res[1].Value as double? : 10000,
                        //level = res[2].Value != null ? res[2].Value as double? : 0,
                        //temp = res[3].Value != null ? res[3].Value as double? : 20.4, // преабразуем
                        //volume = res[4].Value != null ? res[4].Value as double? : 11000,
                        //water_level = res[5].Value != null ? res[5].Value as double? : 0.1, // преабразуем
                        //water_volume = res[6].Value != null ? res[6].Value as double? : 0.1,

                    };
                    return tank;
                }
                return null;
            }
            catch (Exception e)
            {
                String.Format("Ошибка выполнения метода ReadTagsTank()").SaveError(e);
                return null;
            }
        }

    }
}
