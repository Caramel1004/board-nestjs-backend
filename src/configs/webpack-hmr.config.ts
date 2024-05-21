import nodeExternals from 'webpack-node-externals';
import { RunScriptWebpackPlugin } from 'run-script-webpack-plugin';
import webpack from 'webpack';

export default function extendWebpackConfig(options: Partial<webpack.Configuration>): webpack.Configuration {
  console.log("웹팩 !!!")
  return {
    ...options,
    entry: ['webpack/hot/poll?100', options.entry as string],
    externals: [
      nodeExternals({
        allowlist: ['webpack/hot/poll?100'],
      }),
    ],
    plugins: [
      ...(options.plugins || []),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.WatchIgnorePlugin({
        paths: [/\.js$/, /\.d\.ts$/],
      }),
      new RunScriptWebpackPlugin({ name: options.output.filename.toString(), autoRestart: true}),
    ],
  };
}
