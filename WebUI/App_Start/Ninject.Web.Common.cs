[assembly: WebActivatorEx.PreApplicationStartMethod(typeof(WebUI.App_Start.NinjectWebCommon), "Start")]
[assembly: WebActivatorEx.ApplicationShutdownMethodAttribute(typeof(WebUI.App_Start.NinjectWebCommon), "Stop")]

namespace WebUI.App_Start
{
    using System;
    using System.Web;

    using Microsoft.Web.Infrastructure.DynamicModuleHelper;

    using Ninject;
    using Ninject.Web.Common;
    using Ninject.Web.Common.WebHost;
    using Ninject.Web.WebApi;
    using System.Web.Http;

    public static class NinjectWebCommon 
    {
        private static readonly Bootstrapper bootstrapper = new Bootstrapper();

        /// <summary>
        /// Starts the application
        /// </summary>
        public static void Start() 
        {
            DynamicModuleUtility.RegisterModule(typeof(OnePerRequestHttpModule));
            DynamicModuleUtility.RegisterModule(typeof(NinjectHttpModule));
            bootstrapper.Initialize(CreateKernel);
        }
        
        /// <summary>
        /// Stops the application.
        /// </summary>
        public static void Stop()
        {
            bootstrapper.ShutDown();
        }
        
        /// <summary>
        /// Creates the kernel that will manage your application.
        /// </summary>
        /// <returns>The created kernel.</returns>
        private static IKernel CreateKernel()
        {
            var kernel = new StandardKernel();
            try
            {
                kernel.Bind<Func<IKernel>>().ToMethod(ctx => () => new Bootstrapper().Kernel);
                kernel.Bind<IHttpModule>().To<HttpApplicationInitializationHttpModule>();
                RegisterServices(kernel);
                GlobalConfiguration.Configuration.DependencyResolver = new NinjectDependencyResolver(kernel);
                return kernel;
                //kernel.Bind<Func<IKernel>>().ToMethod(ctx => () => new Bootstrapper().Kernel);
                //kernel.Bind<IHttpModule>().To<HttpApplicationInitializationHttpModule>();
                //RegisterServices(kernel);
                //return kernel;
            }
            catch
            {
                kernel.Dispose();
                throw;
            }
        }

        /// <summary>
        /// Load your modules or register your services here!
        /// </summary>
        /// <param name="kernel">The kernel.</param>
        private static void RegisterServices(IKernel kernel)
        {
            kernel.Bind<EFFCK.Abstract.IRepository<EFFCK.Entities.UsersChanges>>().To<EFFCK.Concrete.EFUsersChanges>();
            kernel.Bind<EFFCK.Abstract.IRepository<EFFCK.Entities.FuelSale>>().To<EFFCK.Concrete.EFFuelSale>();
            kernel.Bind<EFFCK.Abstract.IRepository<EFFCK.Entities.ReceivingTanks>>().To<EFFCK.Concrete.EFReceivingTanks>();
            kernel.Bind<EFFCK.Abstract.IRepository<EFFCK.Entities.RemainsTanks>>().To<EFFCK.Concrete.EFRemainsTanks>();
            kernel.Bind<EFFCK.Abstract.IRepository<EFFCK.Entities.RemainsTank>>().To<EFFCK.Concrete.EFRemainsTank>();
            kernel.Bind<EFFCK.Abstract.IReceivingFuel>().To<EFFCK.Concrete.EFReceivingFuel>();

            kernel.Bind<EFFCK.Abstract.IRepository<EFFCK.Entities.Daily_Accounting_Report>>().To<EFFCK.Concrete.EFDaily_Accounting_Report>();
            kernel.Bind<EFFCK.Abstract.IRepository<EFFCK.Entities.Daily_Accounting_Detali_Report>>().To<EFFCK.Concrete.EFDaily_Accounting_Detali_Report>();
            kernel.Bind<EFFCK.Abstract.ISettings>().To<EFFCK.Concrete.EFSettings>();

            kernel.Bind<EFFCK.Abstract.IRepository<EFFCK.Entities.Cat_Depots>>().To<EFFCK.Concrete.EFCat_Depots>();
            kernel.Bind<EFFCK.Abstract.IRepository<EFFCK.Entities.Cat_OZM_GSM>>().To<EFFCK.Concrete.EFCat_OZM_GSM>();
            kernel.Bind<EFFCK.Abstract.IRepository<EFFCK.Entities.Cat_Werks>>().To<EFFCK.Concrete.EFCat_Werks>();

            kernel.Bind<EFFCK.Abstract.IRepository<EFFCK.Entities.TRKcounters>>().To<EFFCK.Concrete.EFTRKcounters>();

            kernel.Bind<EFFCK.Abstract.ILogs>().To<EFFCK.Concrete.EFLogs>();
        }        
    }
}