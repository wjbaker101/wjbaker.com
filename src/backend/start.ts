import 'module-alias/register';

import { app } from '@backend/app';
import { Env } from '@common/util/Env';
import { Logger } from '@backend/util/Logger';

const config = Env.config();

app.listen(config.backend.port, () => {
    Logger.log(`Backend started on port ${config.backend.port}`);
});
