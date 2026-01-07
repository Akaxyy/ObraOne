import { GalleryVerticalEnd } from "lucide-react"
import { LoginForm } from "@/src/components/auth/SignIn-Form"

export default function SignInPage() {
    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            {/* Login Form */}
            <div className="flex flex-col gap-4 p-6 md:p-12">
                <div className="flex justify-center gap-2 md:center">
                    <a href="#" className="flex items-center gap-2 font-medium">
                        <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                            <GalleryVerticalEnd className="size-4" />
                        </div>
                        ObraOne Inc.
                    </a>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">
                        <LoginForm />
                    </div>
                </div>
            </div>

            {/* Hero */}
            <div className="relative hidden h-full flex-col justify-between p-12 text-white lg:flex">

                {/* TODO: Change img src for /public link */}
                <div className="absolute inset-0 bg-blue-900">
                    <img
                        src="https://c3engenharia.com.br/wp-content/themes/c3-egenharia-site/assets/images/solucoes/image-section3.png"
                        className="h-full w-full object-cover opacity-40 mix-blend-overlay"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-blue-950 via-blue-900/60 to-blue-900/10" />
                </div>

                <div className="relative z-10 flex flex-col h-full justify-between">
                    <div>
                        <div className="mb-8 flex items-center gap-2 text-lg font-bold tracking-tighter text-blue-200">
                            ObraOne.
                        </div>
                        <h1 className="text-4xl font-bold leading-tight tracking-tight lg:text-5xl">
                            Construindo o futuro <br /> com precisão.
                        </h1>
                        <p className="mt-6 text-lg text-blue-100 max-w-md leading-relaxed">
                            A plataforma completa para gestão inteligente de obras, cronogramas e processos industriais.
                        </p>
                    </div>

                    {/* Footer */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-4 text-sm font-medium text-blue-200/80">
                            <span>© 2025 ObraOne Inc.</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}