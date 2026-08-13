/** 実行: node --test functions/api/releases.test.ts */
import assert from "node:assert/strict";
import { test } from "node:test";
import { pickLatest } from "./releases.ts";

test("正式版の最新を選ぶ(ベータとドラフトは飛ばす)", () => {
  const list = [
    { tag_name: "v0.6.9-beta.6", prerelease: true, draft: false },
    { tag_name: "v0.7.0", prerelease: false, draft: true },
    { tag_name: "v0.6.8", prerelease: false, draft: false },
    { tag_name: "v0.6.7", prerelease: false, draft: false },
  ];
  assert.equal(pickLatest(list)?.tag_name, "v0.6.8");
});

test("正式版がまだ無い・壊れた入力でも落ちない", () => {
  assert.equal(pickLatest([{ tag_name: "v0.1.0-beta.1", prerelease: true }]), null);
  assert.equal(pickLatest([]), null);
  assert.equal(pickLatest(null as never), null);
});
