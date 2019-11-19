using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;
using MessageLog;
namespace ClientSAPTRK
{
    public class Reservation
    {
        public string RSNUM { get; set; }
        public string RSPOS { get; set; }
        public string MATNR { get; set; }
        public string WERKS { get; set; }
        public string LGORT { get; set; }
        public string UMLGO { get; set; }
        public string UMWRK { get; set; }
        public string BDMNG { get; set; }
        public string ENMNG { get; set; }
        public string LGOBE { get; set; }
        public string MEINS { get; set; }
        public string BWART { get; set; }
    }

    public class Supply
    {
        public string vbeln { get; set; }
        public string posnr { get; set; }
        public string MATNR { get; set; }
        public string WERKS { get; set; }
        public string LGORT { get; set; }
        public string KUNNR { get; set; }
        public string LFIMG { get; set; }
        public string LGOBE { get; set; }
        public string MEINS { get; set; }
        public string BWART { get; set; }
    }

    public class ClientSAP
    {
        protected string url = null;
        protected string transaction_reservation = null;
        protected string transaction_supply = null;
        protected string login;
        protected string pass;

        public ClientSAP()
        {
            try
            {
                this.url = ConfigurationManager.AppSettings["sap_url"].ToString();
                this.transaction_reservation = ConfigurationManager.AppSettings["sap_transaction_reservation"].ToString();
                this.transaction_supply = ConfigurationManager.AppSettings["sap_transaction_supply"].ToString();
                this.login = ConfigurationManager.AppSettings["sap_login"].ToString();
                this.pass = ConfigurationManager.AppSettings["sap_pass"].ToString();
            }
            catch (Exception e)
            {
                Console.WriteLine("Ошибка чтения настроек {0}", e);
            }
        }
        /// <summary>
        /// Запрос информации
        /// </summary>
        /// <param name="message"></param>
        /// <param name="metod"></param>
        /// <param name="accept"></param>
        /// <returns></returns>
        private string Select(string message, string metod, string accept)
        {
            try
            {
                HttpWebRequest request = (System.Net.HttpWebRequest)System.Net.WebRequest.Create(message);
                request.Method = metod;
                request.PreAuthenticate = true;
                request.Credentials = CredentialCache.DefaultCredentials;
                request.Accept = accept;
                try
                {
                    using (System.Net.WebResponse response = request.GetResponse())
                    {
                        try
                        {
                            using (System.IO.StreamReader rd = new System.IO.StreamReader(response.GetResponseStream()))
                            {
                                return rd.ReadToEnd();
                            }
                        }
                        catch (Exception e)
                        {
                            String.Format("Ошибка создания StreamReader ответа, метод {0}, accept {1}, e {2}", metod, accept, e).SaveError(e);
                            return null;
                        }
                    }
                }
                catch (Exception e)
                {
                    String.Format("Ошибка получения ответа WebResponse, метод {0}, accept {1}, e {2}", metod, accept, e).SaveError(e);
                    return null;
                }
            }
            catch (Exception e)
            {
                String.Format("Ошибка выполнения метода Select(metod={0}, accept={1}, e {2}", metod, accept, e).SaveError(e);
                return null;
            }
        }
        /// <summary>
        /// Получить информацию по резервированию
        /// </summary>
        /// <param name="num"></param>
        /// <param name="pos"></param>
        /// <returns></returns>
        public Reservation GetReservation(string num, string pos, string mode)
        {
            try
            {

                string message = this.url + this.transaction_reservation +
                    "&RSNUM=" + num +
                    "&RSPOS=" + pos +
                    "&STTN=101" +
                    "&FLAG_R=" + mode +
                    "&OutputParameter=RSLT" +
                    "&XacuteLoginName=" + this.login +
                    "&XacuteLoginPassword=" + this.pass;

                string response = Select(message, "GET", "text/xml");
                String.Format("\r\n Выполнение метода GetReservation(num={0}, pos={1}, mode={2}) \r\nurl={3} \r\nxml={4}", num, pos, mode, message, response).SaveDebug();

                if (String.IsNullOrWhiteSpace(response)) return null;
                //Console.WriteLine("Result text/xml = {0}", response);

                XDocument doc = XDocument.Parse(response);

                XElement element = doc.Element("Rowsets").Element("Rowset").Elements("Row").FirstOrDefault();

                Reservation reserv = new Reservation()
                {
                    RSNUM = (string)element.Element("RSNUM"),
                    RSPOS = (string)element.Element("RSPOS"),
                    MATNR = (string)element.Element("MATNR"),
                    WERKS = (string)element.Element("WERKS"),
                    LGORT = (string)element.Element("LGORT"),
                    UMLGO = (string)element.Element("UMLGO"),
                    UMWRK = (string)element.Element("UMWRK"),
                    BDMNG = (string)element.Element("BDMNG"),
                    ENMNG = (string)element.Element("ENMNG"),
                    LGOBE = (string)element.Element("LGOBE"),
                    MEINS = (string)element.Element("MEINS"),
                    BWART = (string)element.Element("BWART"),
                };

                return reserv;
            }
            catch (Exception e)
            {
                String.Format("GetReservation(num={0}, pos={1}, mode={2})", num, pos, mode).SaveError(e);
                Console.WriteLine("Ошибка выполнения метода GetReservation(num={0}, pos={1},  mode={2}, e {3}", num, pos, mode, e);
                return null;
            }
        }
        // Вернуть 
        public List<Reservation> GetReservationMatrn(string num, string matrn, string mode)
        {
            try
            {

                string message = this.url + this.transaction_reservation +
                    "&RSNUM=" + num +
                    "&RSPOS="+
                    "&STTN=101" +
                    "&MATNR="+ matrn +
                    "&FLAG_R=" + mode +
                    "&OutputParameter=RSLT" +
                    "&XacuteLoginName=" + this.login +
                    "&XacuteLoginPassword=" + this.pass;

                string response = Select(message, "GET", "text/xml");
                String.Format("\r\n Выполнение метода GetReservation(num={0}, mode={1}) \r\nurl={2} \r\nxml={3}", num, mode, message, response).SaveDebug();

                if (String.IsNullOrWhiteSpace(response)) return null;
                //Console.WriteLine("Result text/xml = {0}", response);

                XDocument doc = XDocument.Parse(response);

                List<Reservation> list_reserv = new List<Reservation>();

                foreach (XElement element in doc.Element("Rowsets").Element("Rowset").Elements("Row"))
                {
                    Reservation reserv = new Reservation()
                    {
                        RSNUM = (string)element.Element("RSNUM"),
                        RSPOS = (string)element.Element("RSPOS"),
                        MATNR = (string)element.Element("MATNR"),
                        WERKS = (string)element.Element("WERKS"),
                        LGORT = (string)element.Element("LGORT"),
                        UMLGO = (string)element.Element("UMLGO"),
                        UMWRK = (string)element.Element("UMWRK"),
                        BDMNG = (string)element.Element("BDMNG"),
                        ENMNG = (string)element.Element("ENMNG"),
                        LGOBE = (string)element.Element("LGOBE"),
                        MEINS = (string)element.Element("MEINS"),
                        BWART = (string)element.Element("BWART"),
                    };
                    list_reserv.Add(reserv);
                }

                return list_reserv;
            }
            catch (Exception e)
            {
                String.Format("GetReservation(num={0}, mode={1})", num, mode).SaveError(e);
                Console.WriteLine("Ошибка выполнения метода GetReservation(num={0}, mode={1}, e {2}", num, mode, e);
                return null;
            }
        }

        /// <summary>
        /// Получить информацию по поставкам
        /// </summary>
        /// <param name="post"></param>
        /// <returns></returns>
        public List<Supply> GetSupply(string post)
        {
            try
            {
                string message = this.url + this.transaction_supply +
                                    "&VBELN=" + post +
                                    "&RSNUM=1" +
                                    "&OutputParameter=RSLT" +
                    "&XacuteLoginName=" + this.login +
                    "&XacuteLoginPassword=" + this.pass;

                string response = Select(message, "GET", "text/xml");

                String.Format("\r\n Выполнение метода GetSupply(post={0}) \r\nurl={1} \r\nxml={2}", post, message, response).SaveDebug();

                if (String.IsNullOrWhiteSpace(response)) return null;
                //Console.WriteLine("Result text/xml = {0}", response);
                XDocument doc = XDocument.Parse(response);

                List<Supply> list_supply = new List<Supply>();

                foreach (XElement element in doc.Element("Rowsets").Element("Rowset").Elements("Row"))
                {
                    Supply sypply = new Supply()
                    {
                        vbeln = (string)element.Element("vbeln"),
                        posnr = (string)element.Element("posnr"),
                        MATNR = (string)element.Element("MATNR"),
                        WERKS = (string)element.Element("WERKS"),
                        LGORT = (string)element.Element("LGORT"),
                        KUNNR = (string)element.Element("KUNNR"),
                        LFIMG = (string)element.Element("LFIMG"),
                        LGOBE = (string)element.Element("LGOBE"),
                        MEINS = (string)element.Element("MEINS"),
                        BWART = (string)element.Element("BWART"),
                    };
                    list_supply.Add(sypply);
                }

                return list_supply;
            }
            catch (Exception e)
            {
                String.Format("GetSupply(post={0})", post).SaveError(e);
                Console.WriteLine("Ошибка выполнения метода GetSupply(post={0}) e={1}", post, e);
                return null;
            }
        }
        /// <summary>
        /// Получить резервирование по дебитору, ОЗМ, режиму
        /// </summary>
        /// <param name="debitor"></param>
        /// <param name="ozm"></param>
        /// <param name="mode"></param>
        /// <returns></returns>
        public Reservation GetReservationOfDebitor(string debitor, string ozm, string mode)
        {
            try
            {

                string message = this.url + this.transaction_reservation +
                    //"&RSNUM=" +
                    //"&RSPOS=" +
                    ////"&RSNUM=3052703" +
                    ////"&RSPOS=1" +
                    "&KUNNR=" + debitor +
                    "&MATNR=" + ozm +
                    "&STTN=101" +
                    "&FLAG_R=" + mode +
                    "&OutputParameter=RSLT" +
                    "&XacuteLoginName=" + this.login +
                    "&XacuteLoginPassword=" + this.pass;

                string response = Select(message, "GET", "text/xml");

                String.Format("\r\n Выполнение метода GetReservationOfDebitor(debitor={0}, ozm={1}, mode={2}) \r\nurl={3} \r\nxml={4}", debitor, ozm, mode, message, response).SaveDebug();

                if (String.IsNullOrWhiteSpace(response)) return null;
                //Console.WriteLine("Result text/xml = {0}", response);

                XDocument doc = XDocument.Parse(response);

                XElement element = doc.Element("Rowsets").Element("Rowset").Elements("Row").FirstOrDefault();

                Reservation reserv = new Reservation()
                {
                    RSNUM = (string)element.Element("RSNUM"), //Номер резервирования
                    RSPOS = (string)element.Element("RSPOS"), // Позиция резервирования
                    MATNR = (string)element.Element("MATNR"), //ОЗМ
                    WERKS = (string)element.Element("WERKS"), //Завод
                    LGORT = (string)element.Element("LGORT"), //Склад-отправитель
                    UMLGO = (string)element.Element("UMLGO"), //Склад-получатель
                    UMWRK = (string)element.Element("UMWRK"), //
                    BDMNG = (string)element.Element("BDMNG"), //Количество требуемое
                    //ENMNG = (string)element.Element("ENMNG"), //
                    LGOBE = (string)element.Element("LGOBE"), //
                    MEINS = (string)element.Element("MEINS"), //базисная единица
                    BWART = (string)element.Element("BWART"), //Вид движения"

                };

                return reserv;
            }
            catch (Exception e)
            {
                String.Format("GetReservationOfDebitor(debitor={0}, ozm={1}, mode={2})", debitor, ozm, mode).SaveError(e);
                Console.WriteLine("Ошибка выполнения метода GetReservationOfDebitor(debitor={0}, ozm={1}, mode={2}, e {3}", debitor, ozm, mode, e);
                return null;
            }
        }
        /// <summary>
        /// Получить резервирование по объему, массе, дебитору, ОЗМ, режиму
        /// </summary>
        /// <param name="valume"></param>
        /// <param name="mass"></param>
        /// <param name="debitor"></param>
        /// <param name="ozm"></param>
        /// <param name="mode"></param>
        /// <returns></returns>
        public Reservation GetReservationOfValumeMassDebitor(double valume , double mass, string debitor, string ozm, string mode)
        {
            try
            {
                string message = this.url + this.transaction_reservation +
                    "&RSNUM=" +
                    "&RSPOS=" +
                    "&KUNNR=" + debitor +
                    "&MATNR=" + ozm +
                    "&STTN=101" +
                    "&FLAG_R=" + mode +
                    "&MENGE=" + mass.ToString("0.##")+
                    "&MENGE_L=" + valume.ToString("0.##") + 
                    "&OutputParameter=RSLT" +
                    "&XacuteLoginName=" + this.login +
                    "&XacuteLoginPassword=" + this.pass;

                string response = Select(message, "GET", "text/xml");

                String.Format("\r\n Выполнение метода GetReservationOfValumeMassDebitor(valume={0}, mass={1}, debitor={2}, ozm={3}, mode={4}) \r\nurl={5} \r\nxml={6}", valume, mass, debitor, ozm, mode, message, response).SaveDebug();

                if (String.IsNullOrWhiteSpace(response)) return null;
                //Console.WriteLine("Result text/xml = {0}", response);

                XDocument doc = XDocument.Parse(response);

                XElement element = doc.Element("Rowsets").Element("Rowset").Elements("Row").FirstOrDefault();

                Reservation reserv = new Reservation()
                {
                    RSNUM = (string)element.Element("RSNUM"), //Номер резервирования
                    RSPOS = (string)element.Element("RSPOS"), // Позиция резервирования
                    MATNR = (string)element.Element("MATNR"), //ОЗМ
                    WERKS = (string)element.Element("WERKS"), //Завод
                    LGORT = (string)element.Element("LGORT"), //Склад-отправитель
                    UMLGO = (string)element.Element("UMLGO"), //Склад-получатель
                    UMWRK = (string)element.Element("UMWRK"), //
                    BDMNG = (string)element.Element("BDMNG"), //Количество требуемое
                    //ENMNG = (string)element.Element("ENMNG"), //
                    LGOBE = (string)element.Element("LGOBE"), //
                    MEINS = (string)element.Element("MEINS"), //базисная единица
                    BWART = (string)element.Element("BWART"), //Вид движения"

                };

                return reserv;
            }
            catch (Exception e)
            {
                String.Format("GetReservationOfValumeMassDebitor(valume={0}, mass={1}, debitor={2}, ozm={3}, mode={4})", valume, mass, debitor, ozm, mode).SaveError(e);
                Console.WriteLine("Ошибка выполнения метода GetReservationOfValumeMassDebitor(debitor={0}, ozm={1}, mode={2}, e {3}", debitor, ozm, mode, e);
                return null;
            }
        }
        /// <summary>
        /// Получить резервирование по наряд допуску
        /// </summary>
        /// <param name="num"></param>
        /// <returns></returns>
        public Reservation GetReservationOfNDopusk(string num, string mode)
        {
            try
            {
                string message = this.url + this.transaction_reservation +
                    "&RSNUM=" +
                    "&RSPOS=" +
                    "&KUNNR=" +
                    "&MATNR=" +
                    "&OTFT=" + num +
                    "&STTN=101" +
                    "&FLAG_R=" + mode +
                    "&MENGE=" + 
                    "&MENGE_L=" + 
                    "&OutputParameter=RSLT" +
                    "&XacuteLoginName=" + this.login +
                    "&XacuteLoginPassword=" + this.pass;

                string response = Select(message, "GET", "text/xml");

                String.Format("\r\n Выполнение метода GetReservationOfNDopusk(num={0}, mode={1}) \r\nurl={2} \r\nxml={3}", num, mode, message, response).SaveDebug();

                if (String.IsNullOrWhiteSpace(response)) return null;
                //Console.WriteLine("Result text/xml = {0}", response);

                XDocument doc = XDocument.Parse(response);

                XElement element = doc.Element("Rowsets").Element("Rowset").Elements("Row").FirstOrDefault();

                Reservation reserv = new Reservation()
                {
                    RSNUM = (string)element.Element("RSNUM"), //Номер резервирования
                    RSPOS = (string)element.Element("RSPOS"), // Позиция резервирования
                    MATNR = (string)element.Element("MATNR"), //ОЗМ
                    WERKS = (string)element.Element("WERKS"), //Завод
                    LGORT = (string)element.Element("LGORT"), //Склад-отправитель
                    UMLGO = (string)element.Element("UMLGO"), //Склад-получатель
                    UMWRK = (string)element.Element("UMWRK"), //
                    BDMNG = (string)element.Element("BDMNG"), //Количество требуемое
                    //ENMNG = (string)element.Element("ENMNG"), //
                    LGOBE = (string)element.Element("LGOBE"), //
                    MEINS = (string)element.Element("MEINS"), //базисная единица
                    BWART = (string)element.Element("BWART"), //Вид движения"

                };
                
                return reserv;
            }
            catch (Exception e)
            {
                String.Format("GetReservationOfNDopusk(num={0})", num).SaveError(e);
                Console.WriteLine("Ошибка выполнения метода GetReservationOfNDopusk(num={0}), e={1}", num, e);
                return null;
            }
        }

    }


}
