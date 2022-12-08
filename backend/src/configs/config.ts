import * as dotenv from 'dotenv'
dotenv.config()

type IAppConfig = {
    PORT: string
}

const AppConfig: IAppConfig = {
    PORT: process.env.PORT || '3333',
}

export default AppConfig
